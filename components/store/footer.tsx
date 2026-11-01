import Link from "next/link";

const navigation = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/about#contact" },
];

const copyrightYear = "2026";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.4fr_1fr] lg:px-8">
                <div className="max-w-sm">
                    <Link
                        href="/"
                        className="font-heading text-xl font-semibold tracking-tight"
                    >
                        cake n roll<span className="text-primary">.</span>
                    </Link>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        Soft rolls, delightful cakes, and something sweet for
                        everyday cravings and special celebrations.
                    </p>
                    <p className="mt-6 text-xs text-muted-foreground">
                        Pickup details and order arrangements are confirmed
                        during checkout.
                    </p>
                </div>

                <div>
                    <h2 className="text-sm font-semibold">Quick links</h2>
                    <nav className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="border-t">
                <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground sm:px-10 lg:px-8">
                    © {copyrightYear} Cake n Roll. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
