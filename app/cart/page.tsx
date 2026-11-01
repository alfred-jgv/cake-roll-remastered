import { Suspense } from "react";
import {
    CartContent,
    CartSkeleton,
} from "@/components/cart/cart-content";

export default function CartPage() {
    return (
        <Suspense fallback={<CartSkeleton />}>
            <CartContent />
        </Suspense>
    );
}