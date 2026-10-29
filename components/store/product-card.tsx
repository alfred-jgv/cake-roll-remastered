import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPHP } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

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
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <Skeleton className="size-16 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                    </div>
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
