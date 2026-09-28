import styles from "../styles/Order.module.css";
import OrderItem from "./OrderItem";
import orderIcon from "@/assets/images/icons/order-icon.svg";
import { Order as OrderType } from "@/types/order";

const Order = ({ order }: { order: OrderType }) => {
  if (!order) return;

  // const shippingMethod = order.shipping_method;

  return (
    <article className={styles.mainBox}>
      <div className={styles.idSection}>
        <img src={orderIcon} alt="Order" />
        <div className={styles.orderId}>{order.id}</div>
      </div>

      <div className={styles.orderLogistics}>
        {order.shipping_method === "delivery" && (
          <div className={styles.shippingInfo}>
            Delivery to: {order.city}, {order.state}, {order.country}{" "}
            {order.zipcode}
          </div>
        )}
        {order.shipping_method === "pickup" && (
          <div className={styles.shippingInfo}>Pickup</div>
        )}
        <div className={styles.date}>Placed on: {order.date}</div>
      </div>
      <div className={styles.orderItems}>
        {order.items?.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      </div>
      <div className={styles.total}>Total: ${order?.total}</div>
    </article>
  );
};

export default Order;
