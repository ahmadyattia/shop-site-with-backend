import { Link } from "react-router-dom";
import styles from "@/styles/Cart/CartItem.module.css";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import slugify from "@/utils/slugify";
import minusIcon from "@/assets/images/icons/minus_icon_16px_white.svg";
import plusIcon from "@/assets/images/icons/plus_icon_16px_white.svg";
import deleteIcon from "@/assets/images/icons/delete_icon_16px_red.svg";
import { CartProduct } from "@/types/product";

interface CartItemProps {
  item: CartProduct;
}

const CartItemDisplay = ({ item }: CartItemProps) => {
  const [animateRemove, setAnimateRemove] = useState("");

  const { handleAddToCart, handleRemoveFromCart } = useCart();

  function handleIncreaseQuantity() {
    handleAddToCart(item, item.quantity + 1);
  }

  function handleReduceQuantity() {
    if (item.quantity === 1) {
      setAnimateRemove(`${styles.animateRemoveItem}`);
      setTimeout(() => {
        handleRemoveFromCart(item, item.quantity - 1);
      }, 1000);
    } else {
      handleRemoveFromCart(item, item.quantity - 1);
    }
  }

  function handleDeleteItem() {
    setAnimateRemove(`${styles.animateRemoveItem}`);
    setTimeout(() => {
      handleRemoveFromCart(item, 0, true);
    }, 1000);
  }

  const itemLocation = `/shop/${slugify(item.category.name)}/${item.id}/${slugify(item.title)}`;

  const discount = item.discount_percentage;
  const discountedPrice = discount
    ? Number.parseFloat((item.price - item.price * (discount / 100)).toFixed(2))
    : 0;

  return (
    <article className={styles.cartItemBox}>
      <div className={`${styles.cartItem} ${animateRemove}`}>
        <div className={styles.imageAndTitle}>
          <img className={styles.productImg} src={item.images[0].url} alt="" />
          <div>
            <p className={styles.title}>{item.title}</p>
            {discount && <p className={styles.discount}>{discount}% Off</p>}
          </div>
        </div>
        <div className={styles.quantityDiv}>
          <img src={minusIcon} alt="" onClick={handleReduceQuantity} />
          <p className={styles.quantity}>{item.quantity}</p>
          <img src={plusIcon} alt="" onClick={handleIncreaseQuantity} />
        </div>
        {discount ? (
          <p className={styles.price}>
            <span className={styles.oldPrice}>${item.price}</span>{" "}
            <span className={styles.newPrice}>${discountedPrice}</span>
          </p>
        ) : (
          <p className={styles.price}>${item.price}</p>
        )}
        <div className={styles.viewLinkBox}>
          <Link to={itemLocation} className={styles.viewLink}>
            View
          </Link>
        </div>
        <div className={styles.deleteIconBox}>
          <img
            className={styles.deleteIcon}
            src={deleteIcon}
            onClick={handleDeleteItem}
          />
        </div>
      </div>
    </article>
  );
};

export default CartItemDisplay;
