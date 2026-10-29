export type CartItem = {
    productId: string;
    variantId: string | null;
    slug: string;
    name: string;
    variantLabel: string;
    unitPrice: number;
    quantity: number;
};

export type AddToCartItem = Omit<CartItem, "quantity">;

export type CartContextValue = {
    items: CartItem[];
    isLoaded: boolean;
    addItem: (item: AddToCartItem) => void;
    removeItem: (productId: string, variantId: string | null) => void;
    updateQuantity: (
        productId: string,
        variantId: string | null,
        quantity: number,
    ) => void;
    clearCart: () => void;
};