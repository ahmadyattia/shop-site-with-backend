import Hero from "@/components/Homepage/Hero/Hero";
import HomepageCategories from "@/components/Homepage/categories/HomepageCategories";
import TopPurshased from "@/components/Homepage/top-sales/TopPurshased";

const Home = () => {
  return (
    <div>
      <Hero />
      <HomepageCategories />
      <TopPurshased />
    </div>
  );
};

export default Home;
