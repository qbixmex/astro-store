import React from "react";
import type { ProductWithImages } from "@/interfaces";
import ProductCard from "./product-card.component";
import styles from "./ProductList.module.css";

type Props = {
  products: ProductWithImages[];
};

const ProductList: React.FC<Readonly<Props>> = ({ products }) => {
  return (
    <section className={styles.productsContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
