"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { CartItem } from "@/features/cart/types/cart.types";

const STORAGE_KEY = "cake-n-roll-cart";

export function useCartPersistence(
    items: CartItem[],
    setItems: Dispatch<SetStateAction<CartItem[]>>,
) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored) {
                const parsed: unknown = JSON.parse(stored);

                if (Array.isArray(parsed)) {
                    setItems(parsed as CartItem[]);
                }
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setIsLoaded(true);
        }
    }, [setItems]);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items, isLoaded]);

    return { isLoaded };
}
