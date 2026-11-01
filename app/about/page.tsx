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
            <section className="mx-auto max-w-3xl space-y-6 text-center">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    A little about us
                </p>

                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    Made for your sweetest moments.
                </h1>

                <p className="text-base leading-8 text-muted-foreground">
                    Welcome to Cake n Roll, where every treat is an invitation
                    to slow down, share something sweet, and make ordinary
                    moments feel a little more special.
                </p>

                <p className="leading-7 text-muted-foreground">
                    From rich chocolate creations to fruity favorites and
                    comforting classic flavors, we bring together treats for
                    celebrations, thoughtful gifts, or simply satisfying your
                    sweet cravings.
                </p>

                <Link
                    href="/products"
                    className="inline-flex items-center justify-center bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-80"
                >
                    Explore our treats
                </Link>
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

            <section
                id="contact"
                className="mt-16 flex flex-col gap-5 border-t pt-10 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <h2 className="text-2xl font-semibold">
                        Find your next favorite.
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        For order questions, browse our treats and include
                        your contact details during checkout.
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
