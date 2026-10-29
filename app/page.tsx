
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { HomepageContent, HomepageContentSkeleton } from "@/components/store/homepage-content";

export default function Home() {
    return (
        <main className="flex-1">
            {/* Hero section */}
            <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 sm:px-10 md:min-h-140 md:grid-cols-2 md:gap-12 md:py-16 lg:px-8">
                <div className="flex flex-col items-start justify-center gap-6 py-8 md:py-12">
                    <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                        Baked with care, shared with love
                    </p>

                    <h1 className="font-heading max-w-xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        A little sweetness goes a long way.
                    </h1>

                    <p className="max-w-md leading-7 text-muted-foreground">
                        Soft rolls, delightful cakes, and something sweet for
                        your everyday cravings and special celebrations.
                    </p>

                    <Link
                        href="/products"
                        className="inline-flex h-11 items-center justify-center gap-2 bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        Explore our treats
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div className="flex min-h-72 items-center justify-center bg-muted px-6 py-12 md:min-h-full">
                    <div className="max-w-sm text-center">
                        <p className="font-heading text-3xl sm:text-4xl">
                            Made to make moments sweeter.
                        </p>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Thoughtful treats for sharing, gifting, and
                            celebrating.
                        </p>
                    </div>
                </div>
            </section>

            {/* Database-driven sections */}
            <Suspense fallback={<HomepageContentSkeleton />}>
                <HomepageContent />
            </Suspense>
        </main>
    );
}
