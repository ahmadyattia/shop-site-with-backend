import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/layout/Footer";
import styles from "@/styles/MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Breadcrumbs />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
