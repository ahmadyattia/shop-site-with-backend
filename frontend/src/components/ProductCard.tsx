import styles from "../styles/ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "./Cart/AddToCartBtn";
import { Product } from "@/types/product";
import ImageSkeleton from "./ImageSkeleton";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const discountedPrice =
    product.discount_percentage && product.discount_percentage > 0
      ? (
          product.price -
          product.price * (product.discount_percentage / 100)
        ).toFixed(2)
      : null;

  function handleCardClick() {
    navigate(`${product.slug}?product_id=${product.id}`);
  }

  return (
    <article className={`${styles.card} ${styles.font}`}>
      <div className={styles.details} onClick={handleCardClick}>
        <ImageSkeleton src={product.images[0].url} alt={product.title} />
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.description}>
          <p className={styles.descriptionText}>{product.description}</p>
          <p className={styles.readMore}>Read More</p>
        </div>
        <p className={styles.category}>{product.category.name}</p>
      </div>
      <div className={styles.checkout}>
        <div>
          <p className={styles.priceLabel}>Price</p>
          {discountedPrice ? (
            <p className={styles.amount}>
              <span className={styles.oldPrice}>${product.price}</span>{" "}
              <span className={styles.newPrice}>${discountedPrice}</span>
            </p>
          ) : (
            <p className={styles.amount}>${product.price}</p>
          )}
        </div>
        <AddToCartBtn product={product} />
      </div>
    </article>
  );
};

export default ProductCard;
