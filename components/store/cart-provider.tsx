"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type CartItem = {
    productId: string;
    variantId: string | null;
    slug: string;
    name: string;
    variantLabel: string;
    unitPrice: number;
    quantity: number;
};

type AddToCartItem = Omit<CartItem, "quantity">;

type CartContextValue = {
    items: CartItem[];
    isLoaded: boolean;
    addItem: (item: AddToCartItem) => void;
    removeItem: (productId: string, variantId: string | null) => void;
    updateQuantity: (
        productId: string,
        variantId: string | null,
        quantity: number,
    ) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "cake-n-roll-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored) {
                const parsed: unknown = JSON.parse(stored);

                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = useCallback((item: AddToCartItem) => {
        setItems((current) => {
            const existing = current.find(
                (entry) =>
                    entry.productId === item.productId &&
                    entry.variantId === item.variantId,
            );

            if (existing) {
                return current.map((entry) =>
                    entry.productId === item.productId &&
                    entry.variantId === item.variantId
                        ? { ...entry, quantity: entry.quantity + 1 }
                        : entry,
                );
            }

            return [...current, { ...item, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback(
        (productId: string, variantId: string | null) => {
            setItems((current) =>
                current.filter(
                    (item) =>
                        !(
                            item.productId === productId &&
                            item.variantId === variantId
                        ),
                ),
            );
        },
        [],
    );

    const updateQuantity = useCallback(
        (productId: string, variantId: string | null, quantity: number) => {
            if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
                return;
            }

            setItems((current) =>
                current.map((item) =>
                    item.productId === productId && item.variantId === variantId
                        ? { ...item, quantity }
                        : item,
                ),
            );
        },
        [],
    );

    return (
        <CartContext.Provider
            value={{ items, isLoaded, addItem, removeItem, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
}
