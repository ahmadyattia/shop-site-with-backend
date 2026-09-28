// fetch orders from db

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types/order";
import { api } from "@/server/api";

type useFetchOrdersType = [
  orders: Order[],
  loading: boolean,
  error: string | null,
];

export default function useFetchOrders(): useFetchOrdersType {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    setLoading(true);
    setError(null);

    async function fetchOrders() {
      try {
        const response = await api.get("/orders");

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders from db:", error);
        setError("Error fetching orders. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  return [orders, loading, error];
}
