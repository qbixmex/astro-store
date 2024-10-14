import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, Product, ProductImage } from "astro:db";
import type { ProductWithImages } from "@/interfaces";

const newProduct: ProductWithImages = {
  id: "",
  title: "",
  slug: "",
  description: "",
  price: 0,
  gender: "",
  type: "",
  stock: 0,
  sizes: "",
  tags: "",
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

    const images = productImages.map((img) => img.image);

    return {
      product,
      images,
    };
  },
});

export default getProductBySlug;