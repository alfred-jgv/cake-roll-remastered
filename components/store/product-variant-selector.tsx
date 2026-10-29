"use client";

import { useState } from "react";
import { formatPHP } from "@/lib/format";

type Variant = {
    id: string;
    label: string;
    price: number;
};

type ProductVariantSelectorProps = {
    variants: Variant[];
    basePrice: number;
};

export default function ProductVariantSelector({
    variants,
    basePrice,
}: ProductVariantSelectorProps) {
    const [selectedVariantId, setSelectedVariantId] = useState(
        variants[0]?.id ?? "",
    );

    const selectedVariant = variants.find(
        (variant) => variant.id === selectedVariantId,
    );

    const price = selectedVariant?.price ?? basePrice;

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
                                    onClick={() =>
                                        setSelectedVariantId(variant.id)
                                    }
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
        </div>
    );
}
