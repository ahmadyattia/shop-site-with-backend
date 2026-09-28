import { CartProduct, Product } from "./product.js";

export interface Order {
  id?: string;
  date?: string;
  full_name: string;
  email: string;
  phone: string;
  shipping_method: string;
  city?: string;
  country?: string;
  state?: string;
  zipcode?: string;
  total: number;
  items: CartProduct[];
  created_at?: string;
}
