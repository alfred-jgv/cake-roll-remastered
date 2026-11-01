"use client";

import { useState } from "react";
import { formatPHP } from "@/lib/format";
import { useCart } from "@/features/cart/hooks/use-cart";

type Variant = {
    id: string;
    label: string;
    price: number;
};

type ProductVariantSelectorProps = {
    productId: string;
    productSlug: string;
    productName: string;
    variants: Variant[];
    basePrice: number;
};

export default function ProductVariantSelector({
    productId,
    productSlug,
    productName,
    variants,
    basePrice,
}: ProductVariantSelectorProps) {
    const [selectedVariantId, setSelectedVariantId] = useState(
        variants[0]?.id ?? "",
    );
    const [added, setAdded] = useState(false);
    const { addItem } = useCart();

    const selectedVariant = variants.find(
        (variant) => variant.id === selectedVariantId,
    );

    const price = selectedVariant?.price ?? basePrice;

    function handleAddToCart() {
        addItem({
            productId,
            variantId: selectedVariant?.id ?? null,
            slug: productSlug,
            name: productName,
            variantLabel: selectedVariant?.label ?? "Standard",
            unitPrice: price,
        });

        setAdded(true);
    }

    return (
        <div className="mt-8 w-full space-y-4">
            <div>
                <h2 className="mb-3 text-sm font-medium">Choose an option</h2>

                {variants.length > 0 ? (
                    <div className="space-y-2">
                        {variants.map((variant) => {
                            const isSelected = variant.id === selectedVariantId;

                            return (
                                <button
                                    key={variant.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedVariantId(variant.id);
                                        setAdded(false);
                                    }}
                                    aria-pressed={isSelected}
                                    className={`flex w-full items-center justify-between border px-4 py-3 text-left transition-colors ${
                                        isSelected
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                    }`}
                                >
                                    <span className="text-sm">
                                        {variant.label}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {formatPHP(variant.price)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Standard option
                    </p>
                )}
            </div>

            <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">Selected price</p>
                <p className="mt-1 text-2xl font-semibold">
                    {formatPHP(price)}
                </p>
            </div>

            <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
                Add to Cart
            </button>

            {added && (
                <p role="status" className="text-sm text-muted-foreground">
                    Added to cart.
                </p>
            )}
        </div>
    );
}
