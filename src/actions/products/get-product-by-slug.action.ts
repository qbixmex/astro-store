import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, Product, ProductImage } from "astro:db";
import type { ProductWithImages } from "@/interfaces";

const newProduct: ProductWithImages = {
  id: "",
  title: "Black pant for Women",
  slug: "black-pant-for-women",
  description: "This is a wonderful product for women with great materials ...",
  price: 24.50,
  gender: "women",
  type: "pants",
  stock: 25,
  sizes: "S,M,L",
  tags: "pants, new",
  images: "",
};

const getProductBySlug = defineAction({
  accept: "json",
  input: z.string(),

  handler: async (slug) => {

    if (slug === "new") {
      return {
        product: newProduct,
        images: [],
      };
    }

    const product = await db
      .select()
      .from(Product)
      .where(eq(Product.slug, slug))
      .get();

    if (!product) {
      throw new Error(`Product with slug "${slug}" not found !`);
    }

    const productImages = await db
      .select()
      .from(ProductImage)
      .where(eq(ProductImage.productId, product.id));

    return {
      product,
      images: productImages,
    };
  },
});

export default getProductBySlug;