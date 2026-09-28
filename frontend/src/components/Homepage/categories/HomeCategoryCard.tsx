import styles from "@/styles/Homepage/categories/HomeCategoryCard.module.css";
import categoriesImages from "@/data/CategoriesImages";
import { useNavigate } from "react-router-dom";

interface HomeCategoryCardProps {
  category: {
    name: string;
    slug: string;
  };
}

const HomeCategoryCard = ({ category }: HomeCategoryCardProps) => {
  const navigate = useNavigate();

  const categoryImg = categoriesImages.find((img) => {
    return img.category.toLowerCase() === category.name.toLowerCase();
  })?.imgURL;

  function handleClick() {
    navigate(`/shop/${category.slug}`);
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <img className={styles.img} src={categoryImg} alt="" />
      <p className={styles.name}>{category.name}</p>
    </div>
  );
};

export default HomeCategoryCard;
