import { Product } from "@/types/product";
import { MappedProduct } from "@/types/product";

// export interface MappedProduct {
//     category: string;
//     description: string;
//     discountPercentage: number;
//     productId: string;
//     id: string;
//     creationAt: string;
//     price: number;
//     slug: string;
//     title: string;
//     images: string[];
// }

export default function productsMapper(products: Product[]): MappedProduct[] {
  return products.map((product) => {
    return {
      category: product.category.name,
      description: product.description,
      discount_percentage: product.discount_percentage,
      id: product.id,
      creation_at: product.creation_at,
      price: product.price,
      slug: product.slug,
      title: product.title,
      images: product.images,
    };
  });
}
