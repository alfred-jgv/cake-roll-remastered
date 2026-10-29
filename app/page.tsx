import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16">
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
                Cake n Roll
            </p>
            <h1 className="font-heading max-w-lg text-center text-4xl font-semibold tracking-tight">
                Soft rolls and celebration cakes, made to order.
            </h1>
            <p className="text-muted-foreground max-w-md text-center">
                Phase 1 theme check. Lora headings and a pink primary button
                should be visible here.
            </p>
            <Button size="lg">Browse cakes</Button>
        </main>
    );
}
