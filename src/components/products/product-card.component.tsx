import { useState } from "react";
import type { ProductWithImages } from "@/interfaces";
import styles from "./product-card.module.css";
import { formatCurrency } from "@/utils";

type Props = {
  product: ProductWithImages;
};

const ProductCard: React.FC<Readonly<Props>> = ({ product }) => {

  const images = product.images.split(',').map((image) => {
    return image.startsWith("http")
      ? image
      : `${import.meta.env.PUBLIC_URL}/assets/products/${image}`;
  });

  const [currentImage, setCurrentImage] = useState(images.at(0));

  return (
    <a href={`/products/${product.slug}`} title={`Check more "${product.title}" details`}>
      <div className={styles.card}>
        <img
          src={currentImage}
          className={styles.image}
          alt={product.title}
          onMouseEnter={() => setCurrentImage(images.at(1) ?? images.at(0))}
          onMouseLeave={() => setCurrentImage(images.at(0))}
        />
        <div className={styles.details}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.price}>{formatCurrency(product.price)}</p>
        </div>
      </div>
    </a>
  );

};

export default ProductCard;
