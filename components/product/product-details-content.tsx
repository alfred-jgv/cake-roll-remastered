import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/products/data/products";
import { formatPHP } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import ProductVariantSelector from "@/components/product/product-variant-selector";
import { getProductImageUrl } from "@/lib/supabase/storage";

type ProductDetailsContentProps = {
    slug: string;
};

export async function ProductDetailsContent({
    slug,
}: ProductDetailsContentProps) {
    const product = await getProductBySlug(slug);

    if (!product || !product.isAvailable) {
        notFound();
    }

    const availableVariants = product.variants.filter(
        (variant) => variant.isAvailable,
    );

    return (
        <main className="flex-1">
            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-2 lg:px-8">
                <div className="relative aspect-4/5 overflow-hidden bg-muted">
                    <Image
                        src={getProductImageUrl(product.images[0]?.path)}
                        alt={product.images[0]?.alt ?? product.name}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col items-start py-2">
                    <Link
                        href="/products"
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        ← Back to all treats
                    </Link>

                    <p className="mt-8 text-xs tracking-[0.2em] text-primary uppercase">
                        {product.category.name}
                    </p>

                    <h1 className="font-heading mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                        {product.name}
                    </h1>

                    <p className="mt-5 text-2xl font-medium">
                        {formatPHP(product.basePrice)}
                    </p>

                    <p className="mt-6 leading-7 text-muted-foreground">
                        {product.description}
                    </p>

                    <div className="mt-8 space-y-3 text-sm">
                        <p>
                            <span className="font-medium">Lead time:</span>{" "}
                            {product.leadTimeDays}{" "}
                            {product.leadTimeDays === 1 ? "day" : "days"}
                        </p>
                        <p>
                            <span className="font-medium">Availability:</span>{" "}
                            Available to order
                        </p>
                    </div>

                    {availableVariants.length > 0 ? (
                        <ProductVariantSelector
                            productId={product.id}
                            productSlug={product.slug}
                            productName={product.name}
                            variants={availableVariants.map((variant) => ({
                                id: variant.id,
                                label: variant.label,
                                price: variant.price,
                            }))}
                            basePrice={product.basePrice}
                        />
                    ) : (
                        <p className="mt-8 text-2xl font-medium">
                            {formatPHP(product.basePrice)}
                        </p>
                    )}

                    <p className="mt-8 text-sm text-muted-foreground">
                        Ordering and checkout will be available soon.
                    </p>
                </div>
            </section>
        </main>
    );
}

export function ProductDetailsSkeleton() {
    return (
        <main className="flex-1">
            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-2 lg:px-8">
                <Skeleton className="aspect-4/5 w-full" />

                <div className="space-y-5">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </section>
        </main>
    );
}
