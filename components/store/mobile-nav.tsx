"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
    { label: "Home", href: "/" },
    { label: "Our Cakes", href: "/products" },
    { label: "About Us", href: "/about" },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <Button
                variant="ghost"
                size="icon"
                aria-label={
                    isOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? (
                    <X className="size-5" />
                ) : (
                    <Menu className="size-5" />
                )}
            </Button>

            {isOpen && (
                <nav
                    aria-label="Mobile navigation"
                    className="absolute inset-x-0 top-16 border-b bg-background px-4 py-3 shadow-sm"
                >
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-3 text-sm"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            )}
        </div>
    );
}
