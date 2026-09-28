import { useRef, useState } from "react";
import styles from "@/styles/Cart/NavbarCart.module.css";
import CartDropdown from "@/components/Cart/CartDropdown";
import CartCount from "./CartCount";
import useClickOutside from "@/hooks/useClickOutside";
import cartIcon from "@/assets/images/icons/shopping_cart.svg";

const NavbarCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useClickOutside(setIsOpen, dropdownRef);

  function handleIconClick() {
    // control the toggling of the dropdown
    setIsOpen((prev) => !prev);
  }

  return (
    <div className={styles.navbarCart} ref={dropdownRef}>
      <img
        onClick={handleIconClick}
        id={styles.cartIcon}
        src={cartIcon}
        alt="Cart"
        title="Cart"
      />
      <CartCount />
      <div id={styles.dropdown}>
        <CartDropdown isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default NavbarCart;
