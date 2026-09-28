import { useState } from "react";
import styles from "../styles/ImageSkeleton.module.css";

interface ImageSkeletonProps {
  src: string;
  alt: string;
}

const ImageSkeleton = ({ src, alt }: ImageSkeletonProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles["container"]}>
      {!loaded && <div className={styles["skeleton"]} />}
      <img
        className={` ${styles["img"]} ${loaded ? styles["loaded"] : ""}`}
        src={src}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </div>
  );
};

export default ImageSkeleton;
