import styles from "../Styles/OrderItem.module.css";
import { Link } from "react-router-dom";
import slugify from "../utils/slugify";
import { CartProduct } from "@/types/product";

const OrderItem = ({ item }: { item: CartProduct }) => {
  const itemLocation = `/shop/${slugify(item.category.name)}/${slugify(item.title)}?product_id=${item.id}`;

  const discount =
    item.discount_percentage && item.discount_percentage > 0
      ? (item.price - item.price * (item.discount_percentage / 100)).toFixed(2)
      : "";

  return (
    <div className={styles.mainBox}>
      <img className={styles.img} src={item.images[0].url} alt={item.title} />
      <div className={styles.title}>{item.title}</div>
      {discount ? (
        <div className={styles.price}>
          <span className={styles.oldPrice}>${item.price}</span>{" "}
          <span className={styles.newPrice}>${discount}</span>
        </div>
      ) : (
        <div className={styles.price}>${item.price}</div>
      )}
      <div className={styles.quantity}>Qty: {item.quantity}</div>
      <div className={styles.viewLinkBox}>
        <Link to={itemLocation} className={styles.viewLink}>
          View
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
