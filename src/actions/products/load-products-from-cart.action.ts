import type { CartItem } from "@/interfaces";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, Product, ProductImage, eq, inArray } from 'astro:db';

const loadProductsFromCart = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (cartCookie) => {

    const cart = JSON.parse(cartCookie) as CartItem[];

    if (cart.length === 0) return [];

    const productIds = cart.map((item) => item.productId);

    const dbProducts = await db
        .select()
        .from(Product)
        .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
        .where(inArray(Product.id, productIds));

    return cart.map((cartItem) => {
      const dbProduct = dbProducts.find((p) => p.Product.id === cartItem.productId);

      if (!dbProduct) {
        throw new Error(`Product with id ${cartItem.productId} not found !`);
      }

      return {
        productId: dbProduct.Product.id,
        title: dbProduct.Product.title,
        slug: dbProduct.Product.slug,
        size: cartItem.size,
        quantity: cartItem.quantity,
        image: dbProduct.ProductImage.image.startsWith('http')
          ? dbProduct.ProductImage.image
          : `${import.meta.env.PUBLIC_URL}/assets/products/${dbProduct.ProductImage.image}`,
        price: dbProduct.Product.price,
      };
    });
  },

});

export default loadProductsFromCart;
