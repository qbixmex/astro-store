import type { ProductWithImages } from "@/interfaces";
import styles from "./product-card.module.css";
import { formatCurrency } from "@/utils";

type Props = {
  product: ProductWithImages;
};

const ProductCard: React.FC<Readonly<Props>> = ({ product }) => {
  const productImages = product.images.split(',');

  return (
    <section className={styles.card}>
      <a href={`/products/${product.slug}`}>
        <img
          src={`/assets/products/${productImages.at(1)}`}
          className={styles.image}
        />
        <h3>{product.title}</h3>
      </a>
      <p className={styles.price}>{formatCurrency(product.price)}</p>
    </section>
  );

};

export default ProductCard;
