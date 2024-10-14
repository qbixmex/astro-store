import crypto from "node:crypto";
import { defineAction } from "astro:actions";
import { getSession } from "auth-astro/server";
import { z } from "astro:content";
import { db, eq, Product } from "astro:db";

const createUpdateProduct = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    // images: z.string().optional(),
    stock: z.number(),
    price: z.number(),
    sizes: z.string(),
    tags: z.string(),
    type: z.string(),
    gender: z.string(),

    // TODO: Add image field
  }),
  handler: async (form, { request }) => {
    const session = await getSession(request);
    const user = session?.user;

    if (!user) {
      throw new Error("Unauthorized Action, You must logged in !");
    }

    const {
      id = crypto.randomUUID(),
      ...formWithoutId
    } = form;

    //* Slugify the slug
    formWithoutId.slug = formWithoutId.slug.trim().replaceAll(" ", "-").toLowerCase();

    const product = {
      id,
      user: user.id!,
      ...formWithoutId,
    };

    // TODO: Create Product

    //* Update Product
    const result = await db
      .update(Product)
      .set(product)
      .where(
        eq(Product.id, id)
      );

    if (result.rowsAffected === 0) {
      throw new Error("Failed to Save Product");
    };

    // TODO: Insert Images

    return {
      ok: true,
      message: "Product Saved Successfully",
      product,
    };
  },
});

export default createUpdateProduct;