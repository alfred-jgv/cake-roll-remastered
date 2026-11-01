"use client";

import { useCallback, useState, type ReactNode } from "react";

import { CartContext } from "@/features/cart/context/cart-context";
import { useCartPersistence } from "@/features/cart/hooks/use-cart-persistence";
import type { AddToCartItem, CartItem } from "@/features/cart/types/cart.types";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const { isLoaded } = useCartPersistence(items, setItems);

    const addItem = useCallback((item: AddToCartItem) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (existing) =>
                    existing.productId === item.productId &&
                    existing.variantId === item.variantId,
            );

            if (existingItem) {
                return currentItems.map((existing) =>
                    existing.productId === item.productId &&
                    existing.variantId === item.variantId
                        ? {
                              ...existing,
                              quantity: existing.quantity + 1,
                          }
                        : existing,
                );
            }

            return [...currentItems, { ...item, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback(
        (productId: string, variantId: string | null) => {
            setItems((currentItems) =>
                currentItems.filter(
                    (item) =>
                        item.productId !== productId ||
                        item.variantId !== variantId,
                ),
            );
        },
        [],
    );

    const updateQuantity = useCallback(
        (productId: string, variantId: string | null, quantity: number) => {
            if (quantity < 1) return;

            setItems((currentItems) =>
                currentItems.map((item) =>
                    item.productId === productId && item.variantId === variantId
                        ? { ...item, quantity }
                        : item,
                ),
            );
        },
        [],
    );

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    return (
        <CartContext.Provider
            value={{
                items,
                isLoaded,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
