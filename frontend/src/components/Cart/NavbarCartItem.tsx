import styles from "@/styles/Cart/NavbarCartItem.module.css";
import { useCart } from "@/context/CartContext";
import { CartProduct } from "@/types/product";

interface NavbarCartItemProps {
  item: CartProduct;
}

const NavbarCartItem = ({ item }: NavbarCartItemProps) => {
  const { handleAddToCart, handleRemoveFromCart } = useCart();

  const discount = item.discount_percentage;
  const discountedPrice = discount
    ? (item.price - item.price * (discount / 100)).toFixed(2)
    : "";

  return (
    <article className={styles.item}>
      <img src={item.images[0].url} alt="" className={styles.image} />

      <div className={styles.details}>
        <p>{item.title}</p>
        <div className={styles.priceAndQuantity}>
          {discount ? (
            <p className={styles.price}>
              <span className={styles.oldPrice}>${item.price}</span>{" "}
              <span className={styles.newPrice}>${discountedPrice}</span>
            </p>
          ) : (
            <p className={styles.price}>${item.price}</p>
          )}
          <div id={styles.quantity}>
            <button onClick={() => handleAddToCart(item, item.quantity + 1)}>
              +
            </button>
            <p>{item.quantity}</p>
            <button
              onClick={() => handleRemoveFromCart(item, item.quantity - 1)}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NavbarCartItem;
