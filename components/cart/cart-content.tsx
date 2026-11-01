"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/features/cart/hooks/use-cart";
import { formatPHP } from "@/lib/format";

export function CartContent() {
    const { items, isLoaded, removeItem, updateQuantity } = useCart();

    if (!isLoaded) {
        return <CartSkeleton />;
    }

    const subtotal = items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0,
    );

    return (
        <main className="flex-1">
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8">
                <Link
                    href="/products"
                    className="text-sm text-muted-foreground hover:text-foreground"
                >
                    ← Continue shopping
                </Link>

                <h1 className="font-heading mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Your Cart
                </h1>

                {items.length === 0 ? (
                    <div className="mt-12 border-t py-12 text-center">
                        <h2 className="text-lg font-medium">
                            Your cart is empty
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Browse our products to find something you like.
                        </p>
                        <Link
                            href="/products"
                            className="mt-6 inline-block bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
                        <div>
                            {items.map((item) => (
                                <article
                                    key={`${item.productId}-${item.variantId ?? "standard"}`}
                                    className="flex flex-col gap-5 border-t py-6 sm:flex-row sm:items-start sm:justify-between"
                                >
                                    <div className="space-y-2">
                                        <Link
                                            href={`/products/${item.slug}`}
                                            className="font-medium hover:underline"
                                        >
                                            {item.name}
                                        </Link>

                                        <p className="text-sm text-muted-foreground">
                                            {item.variantLabel}
                                        </p>

                                        <p className="text-sm">
                                            {formatPHP(item.unitPrice)} each
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeItem(
                                                    item.productId,
                                                    item.variantId,
                                                )
                                            }
                                            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                                        <div className="flex items-center border">
                                            <button
                                                type="button"
                                                aria-label={`Decrease quantity of ${item.name}`}
                                                disabled={item.quantity <= 1}
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.productId,
                                                        item.variantId,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                className="px-3 py-2 disabled:opacity-40"
                                            >
                                                −
                                            </button>

                                            <span className="min-w-8 text-center text-sm">
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                aria-label={`Increase quantity of ${item.name}`}
                                                disabled={item.quantity >= 99}
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.productId,
                                                        item.variantId,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                className="px-3 py-2 disabled:opacity-40"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="font-medium">
                                            {formatPHP(
                                                item.unitPrice * item.quantity,
                                            )}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <aside className="h-fit border-t pt-6 lg:sticky lg:top-24">
                            <h2 className="text-lg font-medium">
                                Order Summary
                            </h2>

                            <div className="mt-6 flex justify-between gap-4 text-sm">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="font-medium">
                                    {formatPHP(subtotal)}
                                </span>
                            </div>

                            <p className="mt-3 text-xs leading-5 text-muted-foreground">
                                Delivery fees and final order pricing will be
                                confirmed during checkout.
                            </p>

                            <Link
                                href="/checkout"
                                className="mt-6 block w-full bg-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground hover:opacity-90"
                            >
                                Proceed to Checkout
                            </Link>
                        </aside>
                    </div>
                )}
            </section>
        </main>
    );
}

export function CartSkeleton() {
    return (
        <main className="flex-1">
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-6 h-10 w-48 sm:h-12 sm:w-64" />

                <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-0">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="flex flex-col gap-5 border-t py-6 sm:flex-row sm:items-start sm:justify-between"
                            >
                                <div className="space-y-3">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-16" />
                                </div>

                                <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                                    <Skeleton className="h-10 w-28" />
                                    <Skeleton className="h-5 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <aside className="border-t pt-6">
                        <Skeleton className="h-6 w-36" />
                        <div className="mt-6 flex justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="mt-4 h-8 w-full" />
                        <Skeleton className="mt-6 h-12 w-full" />
                    </aside>
                </div>
            </section>
        </main>
    );
}
