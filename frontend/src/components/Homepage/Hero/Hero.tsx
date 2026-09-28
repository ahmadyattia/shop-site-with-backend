import styles from "@/styles/Homepage/hero/Hero.module.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  function handleShopNow() {
    navigate(`/shop`);
  }

  return (
    <div id={styles.hero}>
      <div className={styles.heroCard}>
        <div className={styles.body}>
          <h1 className={styles.headline}>Find Your Next Favorite</h1>
          <p className={styles.text}>
            Explore curated collections, exeptional quality, and products you'll
            love from the very first use.
          </p>
          <button className={styles.shopNowBtn} onClick={handleShopNow}>
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
