
import { Suspense } from "react";
import {
    CartContent,
    CartSkeleton,
} from "@/components/store/cart-content";

export default function CartPage() {
    return (
        <Suspense fallback={<CartSkeleton />}>
            <CartContent />
        </Suspense>
    );
}
