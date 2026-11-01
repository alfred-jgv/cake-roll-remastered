const placeholderPath = "/images/placeholders/cake-placeholder.svg";

export function getProductImageUrl(path: string | null | undefined) {
    if (!path) {
        return placeholderPath;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const bucket =
        process.env.NEXT_PUBLIC_SUPABASE_PRODUCT_BUCKET ?? "product-images";

    if (!supabaseUrl) {
        return placeholderPath;
    }

    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
