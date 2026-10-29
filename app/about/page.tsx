
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us | Cake n Roll",
    description:
        "Get to know Cake n Roll and our love for cakes, sweet treats, and special moments.",
};

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8">
            <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        A little about us
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        Made for your sweetest moments.
                    </h1>

                    <p className="max-w-xl text-base leading-8 text-muted-foreground">
                        Welcome to Cake n Roll, where every treat is an
                        invitation to slow down, share something sweet, and
                        make ordinary moments feel a little more special.
                    </p>

                    <p className="max-w-xl leading-7 text-muted-foreground">
                        From rich chocolate creations to fruity favorites
                        and comforting classic flavors, we bring together
                        treats for celebrations, thoughtful gifts, or
                        simply satisfying your sweet cravings.
                    </p>

                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-80"
                    >
                        Explore our treats
                    </Link>
                </div>

                <div className="flex min-h-80 items-center justify-center bg-muted p-8 sm:min-h-96">
                    <div className="max-w-sm space-y-4 text-center">
                        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                            Cake n Roll
                        </p>
                        <p className="text-3xl font-semibold sm:text-4xl">
                            A little sweetness goes a long way.
                        </p>
                        <p className="text-sm leading-6 text-muted-foreground">
                            Find a treat for your next celebration,
                            gathering, or well-deserved break.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-20 border-t pt-12 lg:mt-28 lg:pt-16">
                <div className="max-w-2xl space-y-4">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        What we believe
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Sweet treats, shared moments.
                    </h2>

                    <p className="leading-7 text-muted-foreground">
                        We believe desserts are more than something to enjoy
                        after a meal. They can be part of a birthday, a
                        family gathering, a gift for someone special, or a
                        small reward at the end of a long day.
                    </p>

                    <p className="leading-7 text-muted-foreground">
                        That is the spirit behind Cake n Roll: making it
                        easier to find something sweet for the moments
                        worth celebrating, big or small.
                    </p>
                </div>
            </section>

            <section className="mt-16 flex flex-col gap-5 border-t pt-10 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">
                        Find your next favorite.
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Browse our selection and find something sweet.
                    </p>
                </div>

                <Link
                    href="/products"
                    className="inline-flex w-fit items-center justify-center border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                    Browse products
                </Link>
            </section>
        </main>
    );
}
