import { Suspense } from "react";
import {
    ProductsContent,
    ProductsContentSkeleton,
} from "@/components/store/products-content";

type ProductsPageProps = {
    searchParams: Promise<{
        category?: string;
    }>;
};

async function ProductsPageContent({
    searchParams,
}: ProductsPageProps) {
    const { category: categorySlug } = await searchParams;

    return <ProductsContent categorySlug={categorySlug} />;
}

export default function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    return (
        <main className="flex-1">
            <Suspense fallback={<ProductsContentSkeleton />}>
                <ProductsPageContent searchParams={searchParams} />
            </Suspense>
        </main>
    );
}