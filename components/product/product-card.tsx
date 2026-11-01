
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatPHP } from "@/lib/format";

type ProductCardProps = {
    name: string;
    slug: string;
    description: string;
    imagePath: string | null;
    imageAlt: string;
    startingPrice: number;
    categoryName: string;
};

export function ProductCard({
    name,
    slug,
    description,
    imagePath,
    imageAlt,
    startingPrice,
    categoryName,
}: ProductCardProps) {
    return (
        <article className="group">
            <Link href={`/products/${slug}`} className="block">
                <div className="relative aspect-4/5 overflow-hidden bg-muted">
                    {imagePath ? (
                        <Image
                            src={imagePath}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Image coming soon
                        </div>
                    )}
                </div>

                <div className="flex items-start justify-between gap-3 pt-4">
                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                            {categoryName}
                        </p>
                        <h3 className="font-heading mt-1 text-lg font-medium">
                            {name}
                        </h3>
                    </div>

                    <ArrowUpRight className="mt-1 size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {description}
                </p>

                <p className="mt-3 text-sm font-medium">
                    From {formatPHP(startingPrice)}
                </p>
            </Link>
        </article>
    );
}
