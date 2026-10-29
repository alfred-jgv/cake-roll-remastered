
import { Suspense } from "react";
import {
    ProductDetailsContent,
    ProductDetailsSkeleton,
} from "@/components/store/product-details-content";
import ProductVariantSelector from "@/components/store/product-variant-selector";

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

async function ProductPageContent({ params }: ProductPageProps) {
    const { slug } = await params;

    return <ProductDetailsContent slug={slug} />;
}

export default function ProductPage({ params }: ProductPageProps) {
    return (
        <Suspense fallback={<ProductDetailsSkeleton />}>
            <ProductPageContent params={params} />
        </Suspense>
    );
}
