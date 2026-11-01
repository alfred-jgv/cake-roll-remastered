
"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useCart } from "@/features/cart/hooks/use-cart";
import {
    createOrder,
    type CreateOrderState,
} from "@/features/checkout/actions/create-order";
import { formatPHP } from "@/lib/format";

const initialState: CreateOrderState = {
    success: false,
    message: "",
};

export default function CheckoutPage() {
    const { items, isLoaded, clearCart } = useCart();
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        createOrder,
        initialState,
    );

    const subtotal = items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0,
    );

useEffect(() => {
    if (state.success) {
        clearCart();
    }
}, [state.success, clearCart]);

    if (!isLoaded) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8">
                <p className="text-sm text-muted-foreground">
                    Loading your checkout...
                </p>
            </main>
        );
    }

    if (items.length === 0 && !state.success) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8">
                <h1 className="font-heading text-4xl font-semibold">
                    Checkout
                </h1>
                <p className="mt-6 text-muted-foreground">
                    Your cart is empty. Add some products before checking out.
                </p>
                <Link
                    href="/products"
                    className="mt-6 inline-block bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                    Browse Products
                </Link>
            </main>
        );
    }

    const inputClass =
        "mt-2 w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-primary";

    return (
        <main className="flex-1">
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8">
                <Link
                    href="/cart"
                    className="text-sm text-muted-foreground hover:text-foreground"
                >
                    ← Back to cart
                </Link>

                <h1 className="font-heading mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Checkout
                </h1>

                <p className="mt-3 text-sm text-muted-foreground">
                    Provide your details so we can arrange your order.
                </p>

                {state.message && (
                    <div
                        role="status"
                        aria-live="polite"
                        className={`mt-6 border p-4 text-sm ${
                            state.success
                                ? "border-primary"
                                : "border-destructive"
                        }`}
                    >
                        <p>{state.message}</p>

                        {state.success && state.orderReference && (
                            <p className="mt-2 font-semibold">
                                Order reference: {state.orderReference}
                            </p>
                        )}
                    </div>
                )}

                {!state.success && (
                    <form
                        ref={formRef}
                        action={formAction}
                        className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]"
                    >
                        <input
                            type="hidden"
                            name="cart"
                            value={JSON.stringify(
                                items.map((item) => ({
                                    productId: item.productId,
                                    variantId: item.variantId,
                                    quantity: item.quantity,
                                })),
                            )}
                        />

                        <div className="space-y-10">
                            <section>
                                <h2 className="text-xl font-medium">
                                    Contact information
                                </h2>

                                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                    <label className="block text-sm font-medium">
                                        Full name
                                        <input
                                            name="customerName"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            minLength={2}
                                            maxLength={120}
                                            className={inputClass}
                                        />
                                        {state.errors?.customerName?.map(
                                            (error) => (
                                                <span
                                                    key={error}
                                                    className="mt-1 block text-xs text-destructive"
                                                >
                                                    {error}
                                                </span>
                                            ),
                                        )}
                                    </label>

                                    <label className="block text-sm font-medium">
                                        Phone number
                                        <input
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            required
                                            minLength={7}
                                            maxLength={30}
                                            className={inputClass}
                                        />
                                        {state.errors?.phone?.map((error) => (
                                            <span
                                                key={error}
                                                className="mt-1 block text-xs text-destructive"
                                            >
                                                {error}
                                            </span>
                                        ))}
                                    </label>

                                    <label className="block text-sm font-medium sm:col-span-2">
                                        Email address (optional)
                                        <input
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            maxLength={254}
                                            className={inputClass}
                                        />
                                        {state.errors?.email?.map((error) => (
                                            <span
                                                key={error}
                                                className="mt-1 block text-xs text-destructive"
                                            >
                                                {error}
                                            </span>
                                        ))}
                                    </label>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-medium">
                                    Fulfillment method
                                </h2>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <label className="flex cursor-pointer gap-3 border border-border p-4 has-:checked:border-primary has-:checked:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="fulfillmentType"
                                            value="DELIVERY"
                                            defaultChecked
                                            className="mt-1 accent-primary"
                                        />
                                        <span>
                                            <span className="block text-sm font-medium">
                                                Delivery
                                            </span>
                                            <span className="mt-1 block text-xs text-muted-foreground">
                                                Have your order delivered.
                                            </span>
                                        </span>
                                    </label>

                                    <label className="flex cursor-pointer gap-3 border border-border p-4 has-:checked:border-primary has-:checked:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="fulfillmentType"
                                            value="PICKUP"
                                            className="mt-1 accent-primary"
                                        />
                                        <span>
                                            <span className="block text-sm font-medium">
                                                Pickup
                                            </span>
                                            <span className="mt-1 block text-xs text-muted-foreground">
                                                Arrange to collect your order.
                                            </span>
                                        </span>
                                    </label>
                                </div>

                                <label className="mt-5 block text-sm font-medium">
                                    Delivery address
                                    <textarea
                                        name="deliveryAddress"
                                        rows={3}
                                        maxLength={500}
                                        autoComplete="street-address"
                                        placeholder="House number, street, barangay, city, and other address details"
                                        className={inputClass}
                                    />
                                    {state.errors?.deliveryAddress?.map(
                                        (error) => (
                                            <span
                                                key={error}
                                                className="mt-1 block text-xs text-destructive"
                                            >
                                                {error}
                                            </span>
                                        ),
                                    )}
                                    <span className="mt-1 block text-xs text-muted-foreground">
                                        Required for delivery; leave blank for pickup.
                                    </span>
                                </label>
                            </section>

                            <section>
                                <h2 className="text-xl font-medium">
                                    Schedule your order
                                </h2>

                                <label className="mt-5 block text-sm font-medium">
                                    Preferred date
                                    <input
                                        name="scheduledFor"
                                        type="date"
                                        required
                                        min={new Date().toLocaleDateString("en-CA")}
                                        className={inputClass}
                                    />
                                    {state.errors?.scheduledFor?.map(
                                        (error) => (
                                            <span
                                                key={error}
                                                className="mt-1 block text-xs text-destructive"
                                            >
                                                {error}
                                            </span>
                                        ),
                                    )}
                                </label>

                                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                    Your requested date will be subject to
                                    availability and confirmation by Cake n Roll.
                                </p>

                                <label className="mt-5 block text-sm font-medium">
                                    Order notes (optional)
                                    <textarea
                                        name="notes"
                                        rows={3}
                                        maxLength={1000}
                                        placeholder="Additional instructions for your order"
                                        className={inputClass}
                                    />
                                </label>
                            </section>

                            <section className="border-t pt-6">
                                <h2 className="text-xl font-medium">
                                    Payment arrangements
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                    Submit your order first. We’ll confirm the
                                    payment arrangements with you afterward.
                                    Payment is not collected on this page.
                                </p>
                            </section>
                        </div>

                        <aside className="h-fit border-t pt-6 lg:sticky lg:top-24">
                            <h2 className="text-xl font-medium">
                                Order summary
                            </h2>

                            <div className="mt-6 divide-y">
                                {items.map((item) => (
                                    <div
                                        key={`${item.productId}-${item.variantId ?? "standard"}`}
                                        className="flex justify-between gap-4 py-4 text-sm"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {item.name}
                                            </p>
                                            <p className="mt-1 text-muted-foreground">
                                                {item.variantLabel} · Qty{" "}
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <span className="shrink-0 font-medium">
                                            {formatPHP(
                                                item.unitPrice * item.quantity,
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex justify-between gap-4 border-t pt-5 text-sm">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="font-medium">
                                    {formatPHP(subtotal)}
                                </span>
                            </div>

                            <div className="mt-3 flex justify-between gap-4 text-sm">
                                <span className="text-muted-foreground">
                                    Delivery fee
                                </span>
                                <span>{formatPHP(0)}</span>
                            </div>

                            <div className="mt-4 flex justify-between gap-4 border-t pt-4">
                                <span className="font-medium">Total</span>
                                <span className="font-semibold">
                                    {formatPHP(subtotal)}
                                </span>
                            </div>

                            <p className="mt-5 text-xs leading-5 text-muted-foreground">
                                Delivery is free for the current MVP. Final
                                order details will be confirmed by Cake n Roll.
                            </p>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="mt-6 w-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isPending
                                    ? "Submitting order..."
                                    : "Place Order"}
                            </button>

                            <p className="mt-3 text-center text-xs text-muted-foreground">
                                No payment is taken at this stage.
                            </p>
                        </aside>
                    </form>
                )}
            </section>
        </main>
    );
}
