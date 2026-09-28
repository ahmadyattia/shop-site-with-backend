import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";
import { CartProduct, Product } from "@/types/product";
import { api } from "@/server/api";

interface CartContextType {
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  handleAddToCart: (product: Product, quantity: number) => void;
  handleRemoveFromCart: (
    product: Product,
    quantity: number,
    removeEntirely?: boolean,
  ) => void;
  deleteCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  // initialize the cart
  const [cart, setCart] = useState<CartProduct[]>([]);

  // useEffect(() => {
  //   if (!user) {

  //   }
  // }, [user]);

  const fetchCart = async () => {
    if (user) {
      try {
        const response = await api.get("/cart");
        const data = response.data;

        setCart(data.cart_items);
      } catch (error) {
        console.error("Error fetching cart items from the db:", error);
      }
    }
  };

  const mergeCartInDb = async () => {
    try {
      const guestCartItems = localStorage.getItem("guest_cart");
      // if (localData) guestCartItems = JSON.parse(localData);

      if (guestCartItems && guestCartItems?.length > 0) {
        // merge local storage cart into the db cart
        await api.post("/cart/merge", guestCartItems);

        localStorage.removeItem("guest_cart");
      }
    } catch (err) {
      console.error("Failed merging local cart to db cart:", err);
    }
  };

  useEffect(() => {
    async function updateCartState() {
      if (user) {
        await mergeCartInDb();
        await fetchCart();
      }
      if (!user) {
        // get cart from local storage and update the cart state
        try {
          const savedCart = localStorage.getItem("guest_cart");
          let guestCart: CartProduct[];

          if (savedCart) {
            guestCart = JSON.parse(savedCart);
            setCart(guestCart);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error("Error parsing cart from local storage:", error);
        }
      }
    }

    updateCartState();
  }, [user]);

  async function handleAddToCart(product: Product, quantity: number) {
    if (user) {
      try {
        await api.post("/cart", { product, quantity });

        // const response = await fetch(
        //   `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        //   {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ product, quantity }),
        //   },
        // );
      } catch (error) {
        console.error("Error adding cart item to db:", error);
      }

      await fetchCart();
    }

    if (!user) {
      // if item exists already, increase quantity
      const existingIndex = cart.findIndex((item) => item.id === product.id);

      let updatedCart: CartProduct[];

      if (existingIndex > -1) {
        updatedCart = cart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity } : item,
        );
      } else {
        // add new item
        updatedCart = [...cart, { ...product, quantity }];
      }

      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  }

  // Action: Remove from Cart
  //

  async function handleRemoveFromCart(
    product: Product,
    quantity: number,
    removeEntirely = false,
  ) {
    if (user) {
      if (quantity > 0) {
        try {
          await api.post("/cart", { product, quantity });
          // const response = await fetch(
          //   `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
          //   {
          //     method: "POST",
          //     credentials: "include",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({ product, quantity }),
          //   },
          // );
        } catch (error) {
          console.error("Error adding cart item to db:", error);
        }
      }

      if (removeEntirely || quantity === 0) {
        try {
          await api.delete("/cart/delete-item", { data: product });
        } catch (error) {
          console.error("Failed to delete item from cart:", error);
        }
      }

      await fetchCart();
    }

    if (!user) {
      // if item exists already, decrease quantity

      const existingIndex = cart.findIndex((item) => item.id === product.id);

      let updatedCart: CartProduct[];

      if (quantity > 0) {
        if (existingIndex > -1) {
          updatedCart = cart.map((item, idx) =>
            idx === existingIndex ? { ...item, quantity } : item,
          );
        } else {
          updatedCart = [...cart, { ...product, quantity }];
        }
      } else {
        updatedCart = cart.filter((item) => item.id !== product.id);
      }

      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  }

  // delete the entire cart from an existing user's account
  async function deleteCart() {
    try {
      await api.delete("/cart/delete-cart");
    } catch (error) {
      console.error("Error deleting cart:", error);
    }

    await fetchCart();
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        handleRemoveFromCart,
        deleteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

export default CartProvider;
