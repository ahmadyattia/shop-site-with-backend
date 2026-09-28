import styles from "@/styles/Cart/OrderCheckout.module.css";
import { useEffect, useRef, useState } from "react";
import CheckoutSummary from "@/components/Cart/CheckoutSummary";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { Order } from "@/types/order";
import { api } from "@/server/api";

const OrderCheckout = () => {
  const { user } = useAuth();
  const { cart, deleteCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const navigate = useNavigate();

  const totalRef = useRef(0);

  if (!user) {
    alert(
      "Problem while authenticating the user. Make sure you're logged in and try again.",
    );
    return null;
  }

  const form = useRef<HTMLFormElement>(null);

  function createOrder(): Order {
    return {
      full_name: fullName,
      email,
      phone,
      shipping_method: shippingMethod,
      city,
      country,
      state,
      zipcode: zipCode,
      total: totalRef.current,
      items: cart,
    };
  }

  const handlePlaceOrder = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // form validation passed. Place order
    e.preventDefault();

    const order = createOrder();

    try {
      const response = await api.post("/orders", order);

      const orderId = response.data.orderId;

      // redirect to the success page
      navigate("/cart/success", {
        state: orderId,
        replace: true,
      });

      // empty the cart
      deleteCart();
    } catch (error) {
      alert("Something went wrong. Failed to place your order.");
      console.error(error);
    }
  };

  // recieve total from CheckoutSummary.jsx
  function recieveTotal(total: number) {
    totalRef.current = total;
  }

  // triggered on "Place Order" button click
  const triggerSubmit = () => {
    if (form.current) {
      form.current.requestSubmit(); // for running validation before submitting
    }
  };

  // default email and full name
  useEffect(() => {
    if (user && user.email && user.first_name && user.last_name) {
      setEmail(user.email);
      setFullName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  return (
    <div id={styles.main}>
      <form ref={form} action="" onSubmit={handlePlaceOrder}>
        <div className={styles.shippingInfo}>
          <h2>Shipping Information</h2>
          <div id={styles.deliveryOptionsBox}>
            <div>
              <input
                type="radio"
                id="deliveryOption"
                name="shipping-option"
                checked={shippingMethod === "delivery"}
                value={"delivery"}
                onChange={(e) => setShippingMethod(e.target.value)}
                required
              />
              <label htmlFor="deliveryOption">Delivery</label>
            </div>
            <div>
              <input
                type="radio"
                id="pickupOption"
                name="shipping-option"
                checked={shippingMethod === "pickup"}
                value={"pickup"}
                onChange={(e) => setShippingMethod(e.target.value)}
                required
              />

              <label htmlFor="pickupOption">Pickup</label>
            </div>
          </div>
        </div>
        <div className={styles.personalInfo}>
          <h2>Personal Info</h2>
          <label htmlFor="fname">*Full name</label>
          <input
            id="fname"
            type="text"
            defaultValue={fullName}
            placeholder="Enter full name"
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email">*Email address</label>
          <input
            id="email"
            type="email"
            defaultValue={email}
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="phone">Phone number (Optional)</label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
          {shippingMethod === "delivery" && (
            <div id={styles.addressInfo}>
              <label htmlFor="country">*Country</label>
              <input
                id="country"
                type="text"
                placeholder="Enter your country"
                required
                onChange={(e) => setCountry(e.target.value)}
              />
              <div id={styles.cityStateZip}>
                <div>
                  <label htmlFor="city">*City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Enter city"
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="state">*State</label>
                  <input
                    id="state"
                    type="text"
                    placeholder="Enter state"
                    required
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="zipcode">*Zip Code</label>
                  <input
                    id="zipcode"
                    type="text"
                    placeholder="Enter ZIP code"
                    required
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
      <div id={styles.orderDetails}>
        <CheckoutSummary
          page="checkout"
          shippingMethod={shippingMethod}
          triggerSubmit={triggerSubmit}
          sendTotal={recieveTotal}
        />
      </div>
    </div>
  );
};

export default OrderCheckout;
