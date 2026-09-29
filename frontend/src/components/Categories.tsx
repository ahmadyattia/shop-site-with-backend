import { useEffect, useState } from "react";
import styles from "@/styles/Categories.module.css";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/category";
import { api } from "@/server/api";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/categories");

        const categories = response.data.categories;
        setCategories(categories);
      } catch (error) {
        setError("Error loading categories...");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (error) {
    return <p style={{ color: "white" }}>{error}</p>;
  }

  return (
    <div>
      <div id={styles["shop-categories"]}>
        {loading && <CategoryCardSkeleton />}
        {categories &&
          categories.map((category) => {
            return (
              <CategoryCard
                key={category.slug}
                slug={category.slug}
                name={category.name}
              ></CategoryCard>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
