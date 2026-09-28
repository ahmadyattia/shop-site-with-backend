import { calculateDiscount, calculateSubtotal } from "@/utils/cartSummaryUtils";
import { useMemo } from "react";
import { CartProduct } from "@/types/product";

export default function useCartSummary(
  cart: CartProduct[],
  shippingMethod: string,
) {
  return useMemo(() => {
    const subtotal = calculateSubtotal(cart);
    const discount = calculateDiscount(cart);
    const shippingPrice = shippingMethod === "delivery" ? 10 : 0; // delivery is $10, pickup is free
    const total = subtotal - discount + shippingPrice;

    return {
      subtotal: Number.parseFloat(subtotal.toFixed(2)),
      discount: Number.parseFloat(discount.toFixed(2)),
      shippingPrice: Number.parseFloat(shippingPrice.toFixed(2)),
      total: Number.parseFloat(total.toFixed(2)),
    };
  }, [cart, shippingMethod]);
}
