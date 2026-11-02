
import "server-only";

import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

async function getCachedHomepageData() {
    "use cache";

    cacheLife("hours");
    cacheTag("products");

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

export async function getHomepageData() {
    await connection();

    return getCachedHomepageData();
}
