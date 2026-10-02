import Hero from "@/components/Homepage/Hero/Hero";
import HomepageCategories from "@/components/Homepage/categories/HomepageCategories";
import TopPurshased from "@/components/Homepage/top-sales/TopPurshased";
import styles from "@/styles/Home.module.css";

const Home = () => {
  return (
    <div id={styles["homepage"]}>
      <Hero />
      <HomepageCategories />
      <TopPurshased />
    </div>
  );
};

export default Home;
