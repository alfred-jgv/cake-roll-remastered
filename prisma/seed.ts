
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { seedCategories, seedProducts } from "./seed-data/catalog";

dotenv.config({ path: ".env.local" });

const connectionString =
    process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("Set DIRECT_URL or DATABASE_URL before running the seed.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    for (const category of seedCategories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {
                name: category.name,
                description: category.description,
                imagePath: category.imagePath,
                sortOrder: category.sortOrder,
            },
            create: category,
        });
    }

    for (const product of seedProducts) {
        const category = await prisma.category.findUniqueOrThrow({
            where: { slug: product.categorySlug },
        });

        const saved = await prisma.product.upsert({
            where: { slug: product.slug },
            update: {
                name: product.name,
                description: product.description,
                basePrice: product.basePrice,
                leadTimeDays: product.leadTimeDays,
                isFeatured: product.isFeatured,
                isAvailable: product.isAvailable,
                categoryId: category.id,
            },
            create: {
                slug: product.slug,
                name: product.name,
                description: product.description,
                basePrice: product.basePrice,
                leadTimeDays: product.leadTimeDays,
                isFeatured: product.isFeatured,
                isAvailable: product.isAvailable,
                categoryId: category.id,
            },
        });

        // Remove old image records, including outdated .webp paths.
        await prisma.productImage.deleteMany({
            where: { productId: saved.id },
        });

        for (const variant of product.variants) {
            await prisma.productVariant.upsert({
                where: {
                    productId_label: {
                        productId: saved.id,
                        label: variant.label,
                    },
                },
                update: {
                    price: variant.price,
                    sortOrder: variant.sortOrder,
                    isAvailable: product.isAvailable,
                },
                create: {
                    productId: saved.id,
                    label: variant.label,
                    price: variant.price,
                    sortOrder: variant.sortOrder,
                    isAvailable: product.isAvailable,
                },
            });
        }

        for (const image of product.images) {
            await prisma.productImage.create({
                data: {
                    productId: saved.id,
                    path: image.path,
                    alt: image.alt,
                    sortOrder: image.sortOrder,
                },
            });
        }
    }

    const [categoryCount, productCount, variantCount, imageCount] =
        await Promise.all([
            prisma.category.count(),
            prisma.product.count(),
            prisma.productVariant.count(),
            prisma.productImage.count(),
        ]);

    console.log(
        `Seed complete: ${categoryCount} categories, ${productCount} products, ${variantCount} variants, ${imageCount} images.`,
    );
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
