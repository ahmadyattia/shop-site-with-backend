import { useCart } from "../../context/CartContext";
import styles from "../../styles/Cart/ItemsSection.module.css";
import CartItemDisplay from "./CartItemDisplay";

const ItemsSection = () => {
  const { cart } = useCart();
  const isCartEmpty = cart.length === 0;

  return (
    <section id={styles.itemsSectionBox}>
      <div id={styles.itemsSection}>
        <div id={styles.headDiv}>
          <h2 id={styles.cartHeader}>Cart</h2>
          <p id={styles.countNotice}>({cart.length})</p>
        </div>

        {isCartEmpty ? (
          <h3 id={styles.emptyCartNotice}>Your Cart is Empty!</h3>
        ) : (
          <>
            <div id={styles.cartColumnTitles}>
              <p id={styles.productsHead}>Product</p>
              <p id={styles.quantityHead}>Quantity</p>
              <p id={styles.priceHead}>Price</p>
              <div id={styles.titlesPlaceholder}></div>
            </div>
            {cart.map((item) => {
              return <CartItemDisplay key={item.id} item={item} />;
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default ItemsSection;
