import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getHomepageData } from "@/features/products/data/get-homepage-data";

async function HomepageContent() {
    const { categories, products } = await getHomepageData();

    return (
        <>
            <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Find your favorite
                </p>
                <h2 className="font-heading mt-2 mb-8 text-3xl font-semibold">
                    Shop by category
                </h2>

                {categories.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-3">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                                className="group border p-6 transition-colors hover:bg-muted"
                            >
                                <h3 className="font-heading text-xl font-medium">
                                    {category.name}
                                </h3>
                                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                                    Explore the collection
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No categories available yet.
                    </p>
                )}
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-8">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                            Made for your cravings
                        </p>
                        <h2 className="font-heading mt-2 text-3xl font-semibold">
                            Featured treats
                        </h2>
                    </div>

                    <Link
                        href="/products"
                        className="flex shrink-0 items-center gap-2 text-sm underline underline-offset-4"
                    >
                        View all
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => {
                            const variant = product.variants[0];

                            return (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    slug={product.slug}
                                    description={product.description}
                                    imagePath={
                                        product.images[0]?.path
                                            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-image/${product.images[0].path}`
                                            : null
                                    }
                                    imageAlt={
                                        product.images[0]?.alt ?? product.name
                                    }
                                    startingPrice={
                                        variant?.price ?? product.basePrice
                                    }
                                    categoryName={product.category.name}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Our featured treats are being prepared. Please check
                        back soon.
                    </p>
                )}
            </section>
        </>
    );
}

function HomepageContentSkeleton() {
    return (
        <>
            <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">
                <Skeleton className="mb-3 h-4 w-32" />
                <Skeleton className="mb-8 h-9 w-56" />

                <div className="grid gap-4 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-28 w-full" />
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-8">
                <Skeleton className="mb-3 h-4 w-40" />
                <Skeleton className="mb-8 h-9 w-52" />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="space-y-4">
                            <Skeleton className="aspect-4/5 w-full" />
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export { HomepageContent, HomepageContentSkeleton };
