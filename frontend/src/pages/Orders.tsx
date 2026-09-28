import styles from "@/styles/Orders.module.css";
import Order from "@/components/Order";
import useFetchOrders from "@/hooks/useFetchOrders";

const Orders = () => {
  const [orders, loading, error] = useFetchOrders();

  return (
    <div id={styles.mainBox}>
      <section id={styles.ordersBox}>
        {loading && <p id={styles.loadingMessage}>Loading your orders...</p>}
        {error && <p id={styles.errorMessage}>Error finding your orders...</p>}

        {!loading &&
          !error &&
          orders.length > 0 &&
          orders.map((order) => {
            return <Order key={order.id} order={order} />;
          })}
        {!loading && !error && orders.length === 0 && (
          <p className={styles.noOrdersMessage}>No orders to show for now!</p>
        )}
      </section>
    </div>
  );
};

export default Orders;
