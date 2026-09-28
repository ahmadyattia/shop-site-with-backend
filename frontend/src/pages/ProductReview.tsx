import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "@/styles/ProductReview.module.css";
import { useEffect, useState } from "react";
import AddToCartBtn from "@/components/Cart/AddToCartBtn";
import backArrowIcon from "@/assets/images/icons/backward_arrow_white_16px.svg";
import { Product } from "@/types/product";
import { api } from "@/server/api";

const ProductReview = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product_id");
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // const product = useMemo(() => {
  //   if (!data) return null;
  //   return data.find((item) => String(item.id) === String(productId));
  // }, [data, productId]);

  useEffect(() => {
    // fetch product by id
    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/products/${category}/${productId}`);

        const product = response.data.product;

        setProduct(product);
      } catch (error) {
        setError("Error finding product...");
        console.log("Error finding product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, []);

  if (!product || error) return <p style={{ color: "white" }}>{error}</p>;
  if (loading) return <p style={{ color: "white" }}>Loading product...</p>;

  const mainImage = product.images?.[selectedImageIndex].url || undefined;
  const discount = product.discount_percentage || 0;
  const priceAfterDiscount =
    discount > 0
      ? Number.parseFloat(
          (product.price - product.price * (discount / 100)).toFixed(2),
        )
      : 0;

  return (
    <>
      <div id={styles.flexbox}>
        <div className={styles.product}>
          <div className={styles.images}>
            <div className={styles.allSmallImages}>
              {product.images?.map((image, index) => {
                const isSelected = index === selectedImageIndex;

                return (
                  <div className={styles.smallImgDiv} key={index}>
                    <img
                      className={styles.smallImages}
                      src={image.url}
                      key={index}
                      alt={`${product.title} gallery thumbnail ${index + 1}`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                    <div
                      className={isSelected ? styles.selectedImgOverlay : ""}
                    ></div>
                  </div>
                );
              })}
            </div>

            <img
              className={styles.mainImageStyle}
              src={mainImage}
              alt={product.title}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.backBtnFlex}>
              <h2 className={styles.title}>{product.title}</h2>

              <div>
                <button
                  type="button"
                  className={styles.backLink}
                  onClick={() => navigate(-1)}
                >
                  <div className={styles.backBtnContentFlex}>
                    <img
                      className={styles.arrowIcon}
                      src={backArrowIcon}
                      alt=""
                      aria-hidden="true"
                    />
                    <span className={styles.backText}>Back</span>
                  </div>
                </button>
              </div>
            </div>
            <p className={styles.category}>{product.category.name}</p>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.checkout}>
              <div className={styles.price}>
                <p className={styles.priceLabel}>Price</p>
                {discount > 0 ? (
                  <p className={styles.amount}>
                    <span className={styles.oldAmount}>${product.price}</span>{" "}
                    <span className={styles.newAmount}>
                      ${priceAfterDiscount}
                    </span>
                  </p>
                ) : (
                  <p className={styles.amount}>${product.price}</p>
                )}
              </div>
              <AddToCartBtn product={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReview;
