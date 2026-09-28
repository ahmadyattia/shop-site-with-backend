import { Navigate, useLocation } from "react-router-dom";
import styles from "@/styles/Cart/Success.module.css";
import successIcon from "@/assets/images/icons/check-success-page.svg";

const Success = () => {
  const location = useLocation();
  const orderId = location.state as string | null;

  console.log(orderId);

  // Redirect users back home if they try to access this page without order details
  if (!orderId) {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <div id={styles.mainBox}>
      <div id={styles.messageBox}>
        <img id={styles.icon} src={successIcon} alt="success icon" />
        <h2 id={styles.successMessage}>
          Your order has been placed successfully!
        </h2>
        <p id={styles.orderIdMessage}>Order id: {orderId}</p>
        <p id={styles.orderReviewMessage}>
          Check your orders in your profile for a full review.
        </p>
      </div>
    </div>
  );
};

export default Success;
