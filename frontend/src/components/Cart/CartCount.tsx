import styles from "@/styles/Cart/CartCount.module.css";
import calculateCartCount from "@/utils/calculateCartCount";

const CartCount = () => {
  let totalCount = calculateCartCount();

  return <p id={styles.count}>{totalCount}</p>;
};

export default CartCount;
