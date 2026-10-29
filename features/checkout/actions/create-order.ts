
"use server";

import { randomBytes } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const checkoutSchema = z
    .object({
        customerName: z.string().trim().min(2).max(120),
        phone: z.string().trim().min(7).max(30),
        email: z.union([z.email(), z.literal("")]).optional(),
        fulfillmentType: z.enum(["DELIVERY", "PICKUP"]),
        deliveryAddress: z.string().trim().max(500).optional(),
        scheduledFor: z.iso.date(),
        notes: z.string().trim().max(1000).optional(),
    })
    .superRefine((data, ctx) => {
        if (
            data.fulfillmentType === "DELIVERY" &&
            !data.deliveryAddress?.trim()
        ) {
            ctx.addIssue({
                code: "custom",
                path: ["deliveryAddress"],
                message: "Delivery address is required.",
            });
        }
    });

const cartSchema = z
    .array(
        z.object({
            productId: z.string().min(1),
            variantId: z.string().min(1).nullable(),
            quantity: z.number().int().min(1).max(99),
        }),
    )
    .min(1)
    .max(50);

export type CreateOrderState = {
    success: boolean;
    message: string;
    orderReference?: string;
    errors?: Record<string, string[] | undefined>;
};

function createOrderReference() {
    return `CR-${randomBytes(6).toString("hex").toUpperCase()}`;
}

export async function createOrder(
    _previousState: CreateOrderState,
    formData: FormData,
): Promise<CreateOrderState> {
    const parsedCheckout = checkoutSchema.safeParse({
        customerName: formData.get("customerName"),
        phone: formData.get("phone"),
        email: formData.get("email") ?? "",
        fulfillmentType: formData.get("fulfillmentType"),
        deliveryAddress: formData.get("deliveryAddress") ?? "",
        scheduledFor: formData.get("scheduledFor"),
        notes: formData.get("notes") ?? "",
    });

    if (!parsedCheckout.success) {
        return {
            success: false,
            message: "Please correct your checkout details.",
            errors: parsedCheckout.error.flatten().fieldErrors,
        };
    }

    const rawCart = formData.get("cart");

    if (typeof rawCart !== "string") {
        return {
            success: false,
            message: "Your cart could not be read. Please return to your cart.",
        };
    }

    let cartData: unknown;

    try {
        cartData = JSON.parse(rawCart);
    } catch {
        return {
            success: false,
            message: "Your cart data is invalid. Please refresh and try again.",
        };
    }

    const parsedCart = cartSchema.safeParse(cartData);

    if (!parsedCart.success) {
        return {
            success: false,
            message:
                "Your cart contains invalid items. Please review your cart.",
        };
    }

    const checkout = parsedCheckout.data;
    const cart = parsedCart.data;

    if (
        new Set(
            cart.map(
                (item) => `${item.productId}:${item.variantId ?? "standard"}`,
            ),
        ).size !== cart.length
    ) {
        return {
            success: false,
            message:
                "Your cart contains duplicate items. Please review your cart.",
        };
    }

    const scheduledFor = new Date(`${checkout.scheduledFor}T00:00:00.000Z`);

    if (
        Number.isNaN(scheduledFor.getTime()) ||
        scheduledFor.getTime() < Date.now() - 24 * 60 * 60 * 1000
    ) {
        return {
            success: false,
            message: "Please select a valid order date.",
        };
    }

    try {
        const order = await prisma.$transaction(async (tx) => {
            const productIds = [...new Set(cart.map((item) => item.productId))];

            const products = await tx.product.findMany({
                where: {
                    id: { in: productIds },
                    isAvailable: true,
                },
                include: {
                    variants: {
                        where: { isAvailable: true },
                    },
                },
            });

            const productById = new Map(
                products.map((product) => [product.id, product]),
            );

            const items = cart.map((cartItem) => {
                const product = productById.get(cartItem.productId);

                if (!product) {
                    throw new Error("CART_PRODUCT_UNAVAILABLE");
                }

                if (cartItem.variantId === null) {
                    if (product.variants.length > 0) {
                        throw new Error("CART_VARIANT_REQUIRED");
                    }

                    return {
                        variantId: null,
                        productName: product.name,
                        variantLabel: "Standard",
                        unitPrice: product.basePrice,
                        quantity: cartItem.quantity,
                        lineTotal: product.basePrice * cartItem.quantity,
                    };
                }

                const variant = product.variants.find(
                    (candidate) => candidate.id === cartItem.variantId,
                );

                if (!variant) {
                    throw new Error("CART_VARIANT_UNAVAILABLE");
                }

                return {
                    variantId: variant.id,
                    productName: product.name,
                    variantLabel: variant.label,
                    unitPrice: variant.price,
                    quantity: cartItem.quantity,
                    lineTotal: variant.price * cartItem.quantity,
                };
            });

            const subtotal = items.reduce(
                (total, item) => total + item.lineTotal,
                0,
            );

            if (!Number.isSafeInteger(subtotal) || subtotal <= 0) {
                throw new Error("INVALID_ORDER_TOTAL");
            }

            const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] =
                items.map((item) => {
                    const orderItem = {
                        productName: item.productName,
                        variantLabel: item.variantLabel,
                        unitPrice: item.unitPrice,
                        quantity: item.quantity,
                        lineTotal: item.lineTotal,
                    };

                    if (item.variantId === null) {
                        return orderItem;
                    }

                    return {
                        ...orderItem,
                        variant: {
                            connect: {
                                id: item.variantId,
                            },
                        },
                    };
                });

            return tx.order.create({
                data: {
                    reference: createOrderReference(),
                    customerName: checkout.customerName,
                    phone: checkout.phone,
                    email: checkout.email || null,
                    fulfillmentType: checkout.fulfillmentType,
                    deliveryAddress:
                        checkout.fulfillmentType === "DELIVERY"
                            ? checkout.deliveryAddress?.trim()
                            : null,
                    scheduledFor,
                    notes: checkout.notes?.trim() || null,
                    subtotal,
                    deliveryFee: 0,
                    total: subtotal,
                    status: "PENDING",
                    paymentStatus: "UNPAID",
                    items: {
                        create: orderItems,
                    },
                },
                select: {
                    reference: true,
                },
            });
        });

        return {
            success: true,
            message:
                "Your order has been submitted. We will contact you to confirm the details and payment arrangements.",
            orderReference: order.reference,
        };
    } catch (error) {
        if (error instanceof Error) {
            const messages: Record<string, string> = {
                CART_PRODUCT_UNAVAILABLE:
                    "A product in your cart is no longer available.",
                CART_VARIANT_REQUIRED:
                    "Please select an option for one of your products.",
                CART_VARIANT_UNAVAILABLE:
                    "A selected product option is no longer available.",
                INVALID_ORDER_TOTAL: "The order total could not be calculated.",
            };

            if (messages[error.message]) {
                return {
                    success: false,
                    message: messages[error.message],
                };
            }
        }

        console.error("Failed to create checkout order:", error);

        return {
            success: false,
            message: "We couldn't submit your order. Please try again.",
        };
    }
}
