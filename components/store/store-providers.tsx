"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/components/store/cart-provider";

export default function StoreProviders({
    children,
}: {
    children: ReactNode;
}) {
    return <CartProvider>{children}</CartProvider>;
}