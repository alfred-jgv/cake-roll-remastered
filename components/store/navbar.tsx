import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/store/mobile-nav";

const navigation = [
    { label: "Home", href: "/" },
    { label: "Our Cakes", href: "/products" },
    { label: "About Us", href: "/about" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
            >
                <Link
                    href="/"
                    className="font-heading text-xl font-semibold tracking-tight"
                    aria-label="Cake n Roll home"
                >
                    cake n roll<span className="text-primary">.</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Search cakes"
                    >
                        <Link href="/products">
                            <Search className="size-5" />
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Shopping bag"
                    >
                        <Link href="/cart">
                            <ShoppingBag className="size-5" />
                        </Link>
                    </Button>

                    <MobileNav />
                </div>
            </nav>
        </header>
    );
}