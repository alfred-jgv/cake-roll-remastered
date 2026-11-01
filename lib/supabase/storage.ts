const placeholderPath = "/images/placeholders/cake-placeholder.svg";
const supportedImageExtension = /\.(?:webp|png|jpe?g)$/i;

export function getProductImageUrl(path: string | null | undefined) {
    const imagePath = path?.trim();

    if (!imagePath) {
        return placeholderPath;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const bucket =
        process.env.NEXT_PUBLIC_SUPABASE_PRODUCT_BUCKET ?? "product-image";

    if (!supabaseUrl) {
        return placeholderPath;
    }

    if (!supportedImageExtension.test(imagePath)) {
        return placeholderPath;
    }

    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${encodeURI(imagePath)}`;
}
