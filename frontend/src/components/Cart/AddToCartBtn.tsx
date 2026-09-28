import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "@/Styles/Cart/AddToCartBtn.module.css";
import mapToCartItem from "@/data/mappers/cartItemMapper";
import { Product } from "@/types/product";

interface AddToCartBtnProps {
  product: Product;
}

const AddToCartBtn = ({ product }: AddToCartBtnProps) => {
  const { cart, handleAddToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  // if the cart gets updated, update the UI
  useEffect(() => {
    setIsInCart(cart.some((item) => item.id == product.id));
  }, [cart]);

  function handleBtnClick() {
    setIsInCart(true);
  }

  return (
    <div>
      {isInCart ? (
        <button className={styles.addedToCartBtn}>Added To Cart</button>
      ) : (
        <button
          className={styles.addToCartBtn}
          onClick={() => {
            handleAddToCart(product, 1);
            handleBtnClick();
          }}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default AddToCartBtn;
