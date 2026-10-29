import "server-only";

import { prisma } from "@/lib/prisma";

export async function getHomepageData() {
    const [categories, products] = await Promise.all([
        prisma.category.findMany({
            orderBy: { sortOrder: "asc" },
            take: 3,
        }),
        prisma.product.findMany({
            where: {
                isAvailable: true,
                isFeatured: true,
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
            take: 4,
        }),
    ]);

    return { categories, products };
}
