import { useContext } from "react";
import styles from "@/Styles/Cart/CartDropdown.module.css";
import NavbarCartItem from "./NavbarCartItem";
import { useCart } from "@/context/CartContext";
import CartDropdownActions from "./CartDropdownActions";

interface CartDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDropdown = ({ isOpen, setIsOpen }: CartDropdownProps) => {
  const { cart } = useCart();

  return (
    <div className={`${styles.cartDropdown} ${isOpen && styles.adjustHeight}`}>
      <h1 id={styles.cartHead}>Cart</h1>
      {cart.length === 0 ? (
        <div id={styles.emptyCartHeader}>
          <h2>Your Cart is Empty!</h2>
        </div>
      ) : (
        <section id={styles.cartItems}>
          {cart.map((item) => {
            return (
              <div key={item.id}>
                <NavbarCartItem item={item} />
                <hr />
              </div>
            );
          })}
        </section>
      )}

      {cart.length > 0 && <CartDropdownActions setIsOpen={setIsOpen} />}
    </div>
  );
};

export default CartDropdown;
