import { Category } from "./category";
import { Image } from "./image";

export interface Product {
  id: string;
  title: string;
  category: Category; // saved in a separate db table
  price: number;
  discount_percentage?: number;
  description: string;
  slug: string;
  creation_at?: string;
  updated_at?: string;
  images: Image[]; // saved in a separate db table
}

export interface MappedProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  discount_percentage?: number;
  creation_at?: string;
  updated_at?: string;
  price: number;
  slug: string;
  images: Image[];
}

export interface CartProduct extends Product {
  quantity: number;
}
