"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/features/cart/hooks/use-cart";

export function CartButton() {
    const { items } = useCart();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link
            href="/cart"
            aria-label={`Shopping bag${itemCount > 0 ? `, ${itemCount} items` : ""}`}
            className="relative inline-flex size-10 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 min-w-4 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full border-2 border-background bg-primary px-1 text-[9px] leading-none font-bold text-primary-foreground shadow-sm">
                    {itemCount > 99 ? "99+" : itemCount}
                </span>
            )}
        </Link>
    );
}
