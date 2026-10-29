"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/features/cart/context/cart-provider";

export default function StoreProviders({
    children,
}: {
    children: ReactNode;
}) {
    return <CartProvider>{children}</CartProvider>;
}