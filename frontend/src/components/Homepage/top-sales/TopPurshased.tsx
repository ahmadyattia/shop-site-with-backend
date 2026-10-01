import { useEffect, useState } from "react";
import styles from "../../../styles/Homepage/top-sales/TopPurchased.module.css";
import { api } from "@/server/api";
import { ProductWithSales } from "@/types/product";
import ProductCardHome from "./ProductCardHome";

const TopPurshased = () => {
  const [products, setProducts] = useState<ProductWithSales[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopPurchased() {
      setError(null);

      try {
        const response = await api.get("/products/top-purchased");
        const topProducts = response.data.products;

        setProducts(topProducts);
      } catch (error) {
        setError("An error occurred...");
        console.error("An error occurred while fetching top products:", error);
      }
    }

    fetchTopPurchased();
  }, []);

  if (error) return;

  return (
    <div id={styles["main"]}>
      <h1 id={styles["title"]}>Most Ordered Products</h1>
      <div id={styles["products"]}>
        {products &&
          products.map((product, index) => {
            return (
              <ProductCardHome
                key={product.id}
                id={product.id}
                image={product.images[0].url}
                title={product.title}
                category={product.category.name}
                slug={product.slug}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TopPurshased;
