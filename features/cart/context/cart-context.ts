"use client";

import { createContext } from "react";
import type { CartContextValue } from "@/features/cart/types/cart.types";

export const CartContext = createContext<CartContextValue | null>(null);