import Link from "next/link";
import { getProductsData } from "@/lib/products";
import { ProductCard } from "@/components/store/product-card";
import { Skeleton } from "@/components/ui/skeleton";

type ProductsContentProps = {
    categorySlug?: string;
};

export async function ProductsContent({ categorySlug }: ProductsContentProps) {
    const { categories, products } = await getProductsData(categorySlug);

    const selectedCategory = categories.find(
        (category) => category.slug === categorySlug,
    );

    return (
        <>
            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8">
                <p className="text-xs tracking-[0.2em] text-primary uppercase">
                    Freshly made for you
                </p>

                <h1 className="font-heading mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                    {selectedCategory?.name ?? "Our Cakes"}
                </h1>

                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                    Discover our selection of cakes, roll cakes, and sweet
                    treats for everyday cravings and special occasions.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                    <Link
                        href="/products"
                        aria-current={!categorySlug ? "page" : undefined}
                        className={`border px-4 py-2 text-sm transition-colors ${
                            !categorySlug
                                ? "border-primary bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                        }`}
                    >
                        All treats
                    </Link>

                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${encodeURIComponent(category.slug)}`}
                            aria-current={
                                categorySlug === category.slug
                                    ? "page"
                                    : undefined
                            }
                            className={`border px-4 py-2 text-sm transition-colors ${
                                categorySlug === category.slug
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                            }`}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-8">
                <p className="mb-6 text-sm text-muted-foreground">
                    {products.length}{" "}
                    {products.length === 1 ? "product" : "products"}
                    {selectedCategory
                        ? ` in ${selectedCategory.name}`
                        : " available"}
                </p>

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
                                    imagePath={null}
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
                    <div className="border border-dashed px-6 py-16 text-center">
                        <h2 className="font-heading text-xl font-medium">
                            No treats found
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Try another category to discover our available
                            products.
                        </p>
                        <Link
                            href="/products"
                            className="mt-5 inline-flex items-center border px-4 py-2 text-sm hover:bg-muted"
                        >
                            View all treats
                        </Link>
                    </div>
                )}
            </section>
        </>
    );
}

export function ProductsContentSkeleton() {
    return (
        <>
            <section className="mx-auto max-w-7xl space-y-4 px-6 py-12 sm:px-10 lg:px-8">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-10 w-56" />
                <Skeleton className="h-5 w-full max-w-xl" />

                <div className="flex flex-wrap gap-2 pt-4">
                    {Array.from({ length: 4 }, (_, i) => (
                        <Skeleton key={i} className="h-10 w-28" />
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-8">
                <Skeleton className="mb-6 h-4 w-28" />

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-4/5 w-full" />
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
