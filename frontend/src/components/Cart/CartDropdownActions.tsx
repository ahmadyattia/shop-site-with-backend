import styles from "@/styles/Cart/CartDropdownActions.module.css";
import { Link } from "react-router-dom";

interface CartDropdownActionsProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDropdownActions = ({ setIsOpen }: CartDropdownActionsProps) => {
  function handleBtnClick() {
    // close the menu when actions buttons are clicked
    setIsOpen(false);
  }

  return (
    <div className={`${styles.actions}`}>
      <Link to={"/cart"}>
        <button id={styles.viewCartBtn} onClick={handleBtnClick}>
          View Cart
        </button>
      </Link>
      <Link to={"/cart/checkout"}>
        <button id={styles.checkoutBtn} onClick={handleBtnClick}>
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartDropdownActions;
