import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/store/navbar";
import StoreProviders from "@/components/store/store-providers";
import { Footer } from "@/components/store/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Cake n Roll",
    description: "Mobile-first cakes and roll cakes, made to order.",
    icons: {
        icon: "/brand/cake-n-roll-logo.ico",
    },
};
export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
        >
            <body className="min-h-full">
                <StoreProviders>
                    <Navbar />
                    {children}
                    <Footer />
                </StoreProviders>
            </body>
        </html>
    );
}
