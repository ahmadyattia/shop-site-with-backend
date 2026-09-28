import { useContext } from "react";
import { CartContext, useCart } from "@/context/CartContext";
import styles from "@/Styles/Cart/CheckoutSummary.module.css";
import { useNavigate } from "react-router-dom";
import useCartSummary from "@/hooks/useCartSummary";

interface CheckoutSummaryProps {
  page: string;
  shippingMethod?: string;
  triggerSubmit?: () => void;
  sendTotal?: (total: number) => void;
}

const CheckoutSummary = ({
  page,
  shippingMethod,
  triggerSubmit,
  sendTotal,
}: CheckoutSummaryProps) => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { subtotal, discount, shippingPrice, total } = useCartSummary(
    cart,
    shippingMethod as string,
  );

  const handleCheckout = () => {
    // if the cart is not empty, proceed to checkout
    if (cart.length > 0) {
      navigate("checkout"); // protected route
    }
  };

  return (
    <section id={styles.checkoutSummaryBox}>
      <div id={styles.checkoutSummary}>
        <div id={styles.promoCodeBox}>
          <h3>Promo code</h3>
          <div id={styles.promoCodeInputBox}>
            <input
              id={styles.promoCodeInput}
              type="text"
              placeholder="Type here..."
            />
            <button id={styles.applyBtn}>Apply</button>
          </div>
        </div>
        <hr />
        <div id={styles.subtotalBox}>
          <p>Subtotal</p>
          <p>${subtotal}</p>
        </div>
        <div id={styles.discountBox}>
          <p>Discount</p>
          <p>-${discount}</p>
        </div>
        <div id={styles.shippingBox}>
          <p>Shipping</p>
          {page === "cart" ? (
            <p>*cost calculated at checkout</p>
          ) : (
            <p>${shippingPrice}</p>
          )}
        </div>
        <div id={styles.totalBox}>
          <p>Total</p>
          <p>${total}</p>
        </div>
        <div id={styles.checkoutBtnBox}>
          {page === "cart" && (
            <button id={styles.checkoutBtn} onClick={handleCheckout}>
              Continue to checkout
            </button>
          )}
          {page === "checkout" && (
            <button
              id={styles.checkoutBtn}
              onClick={() => {
                if (sendTotal && triggerSubmit) {
                  sendTotal(total);
                  triggerSubmit();
                }
              }}
            >
              Place Order
            </button>
          )}
        </div>
        {page === "cart" && (
          <div className={styles.mustLoginMsgBox}>
            <p id={styles.mustLoginMessage}>
              *You must be logged into an existing account to proceed.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckoutSummary;
