import { useEffect, useState } from "react";
import styles from "../../../styles/Homepage/top-sales/ProductCardHome.module.css";
import { useNavigate } from "react-router-dom";

interface ProductCardHomeProps {
  id: string;
  image: string;
  title: string;
  category: string;
  slug: string;
  index: number;
}

const ProductCardHome = ({
  id,
  image,
  title,
  category,
  slug,
  index,
}: ProductCardHomeProps) => {
  const navigate = useNavigate();

  let cardBorderColor = "";
  if (index === 0) cardBorderColor = "red";
  if (index === 1) cardBorderColor = "green";
  if (index === 2) cardBorderColor = "blue";

  return (
    <article
      id={styles["card"]}
      style={{ borderColor: `${cardBorderColor}` }}
      onClick={() => {
        navigate(`/shop/${category}/${slug}?product_id=${id}`);
      }}
    >
      <img src={image} alt={title} />
      <p id={styles["title"]}>{title}</p>
      <p id={styles["category"]}>{category}</p>

      <span id={styles["rank"]}>#{index + 1}</span>
    </article>
  );
};

export default ProductCardHome;
