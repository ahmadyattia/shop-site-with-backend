import { Category } from "./category.js";
import { Image } from "./image.js";

export interface Product {
  id?: number | string;
  title: string;
  category: Category; // saved in a separate db table
  price: number;
  discountPercentage?: number;
  description: string;
  slug: string;
  creationAt?: string;
  updatedAt?: string;
  images: Image[]; // saved in a separate db table
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface ProductWithSales extends Product {
  total_purchased: number;
}
