import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "@/styles/ProductsPagination.module.css";
import { useMemo } from "react";

interface ProductsPaginationProps {
  productsCount: number;
}

const ProductsPagination = ({ productsCount }: ProductsPaginationProps) => {
  const [searchParams] = useSearchParams();
  const { category } = useParams();

  // six products per page
  let pagesCount = Math.ceil(productsCount / 6);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // turn the count into an array
  // example: pagesCount = 4 -> countArray = [1, 2, 3, 4]
  const countArray = useMemo(() => {
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }, [pagesCount]);

  // jump to top of the page on link press
  const jumpToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav className={styles.pagination}>
      {countArray.map((num) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", num.toString());

        const isCurrentPage = currentPage === num;

        return (
          <Link
            className={isCurrentPage ? styles.currentLink : styles.link}
            to={`/shop/${category}?${params}`}
            key={num}
            onClick={jumpToTop}
          >
            {num}
          </Link>
        );
      })}
    </nav>
  );
};

export default ProductsPagination;
