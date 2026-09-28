import { CartProduct } from "@/types/product";

export const calculateSubtotal = (cart: CartProduct[]): number => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const calculateDiscount = (cart: CartProduct[]): number => {
  return cart.reduce((acc, item) => {
    const itemDiscount = item.discount_percentage
      ? item.price * (item.discount_percentage / 100)
      : 0;
    return acc + itemDiscount * item.quantity;
  }, 0);
};
