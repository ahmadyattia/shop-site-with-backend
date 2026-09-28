import { useContext } from "react";
import { useCart } from "@/context/CartContext.js";

function calculateCartCount() {
  const { cart } = useCart();

  if (!cart) return;

  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

export default calculateCartCount;
