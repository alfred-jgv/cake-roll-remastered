"server-only";

import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export async function getProductsData(categorySlug?: string) {
    "use cache";

    cacheLife("hours");
    cacheTag("products");

    const [categories, products] = await Promise.all([
        prisma.category.findMany({
            orderBy: { sortOrder: "asc" },
        }),
        prisma.product.findMany({
            where: {
                isAvailable: true,
                ...(categorySlug
                    ? { category: { slug: categorySlug } }
                    : {}),
            },
            include: {
                category: true,
                variants: {
                    where: { isAvailable: true },
                    orderBy: { price: "asc" },
                    take: 1,
                },
                images: {
                    orderBy: { sortOrder: "asc" },
                    take: 1,
                },
            },
            orderBy: { createdAt: "desc" },
        }),
    ]);

    return { categories, products };
}

export async function getProductBySlug(slug: string) {
    "use cache";

    cacheLife("hours");
    cacheTag("products");

    return prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            variants: {
                orderBy: { price: "asc" },
            },
            images: {
                orderBy: { sortOrder: "asc" },
            },
        },
    });
}
