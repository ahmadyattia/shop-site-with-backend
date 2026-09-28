import styles from "@/styles/CategoryProducts.module.css";
import ProductCard from "./ProductCard";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import slugify from "@/utils/slugify";
import { Product } from "@/types/product";
import { api } from "@/server/api";

interface CategoryProductsProps {
  category: string;
  countSetter: React.Dispatch<React.SetStateAction<number>>;
}

const CategoryProducts = ({ category, countSetter }: CategoryProductsProps) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pageNumber = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    // fetch products according to the category
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/products/${slugify(category)}`);

        const products = response.data.products;

        setProducts(products);
      } catch (error) {
        setError("Error fetching products...");
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const totalCount = products.length;

  useEffect(() => {
    countSetter(totalCount);
  }, [totalCount, countSetter]);

  // take the products of the category..
  // convert them into an array with six products per array entry
  // this is then used to display six products per page
  const productsOfCurrentPage = useMemo(() => {
    const itemsPerPage = 6;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return products.slice(startIndex, endIndex);
  }, [products, pageNumber]);

  if (loading)
    return <h1 className={styles.statusNotice}>Loading products...</h1>;

  if (!products || error)
    return <h1 className={styles.statusNotice}>{error}</h1>;

  if (productsOfCurrentPage.length === 0)
    return <h1 className={styles.statusNotice}>Empty products list...</h1>;

  return (
    <section className={styles.grid}>
      {productsOfCurrentPage.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </section>
  );
};

export default CategoryProducts;
