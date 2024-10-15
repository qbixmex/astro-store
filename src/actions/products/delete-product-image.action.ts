import ImageUpload from "@/utils/image-upload";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, ProductImage } from 'astro:db';
import { getSession } from "auth-astro/server";

const deleteProductImage = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (productImageId, { request }) => {

    const session = await getSession(request);
    const user = session?.user;

    if (!user) {
      throw new Error("Unauthorized Action, You must logged in !");
    }

    const productImage = await db
      .select({
        id: ProductImage.id,
        image: ProductImage.image,
        publicId: ProductImage.publicId
      })
      .from(ProductImage)
      .where(eq(ProductImage.id, productImageId))
      .get();

    if (!productImage) {
      throw new Error(`Product Image with publicId "${productImageId}" not found !`);
    }

    const deleteResponse = await db
      .delete(ProductImage)
      .where(eq(ProductImage.id, productImage.id));

    if (deleteResponse.rowsAffected === 0) {
      throw new Error(`Failed to delete Product Image with publicId "${productImage.id}" !`);
    }

    if (productImage.image.includes("http")) {
      await ImageUpload.delete(productImage.publicId as string);
    }

    return {
      ok: true,
      image: productImage.image,
    };
  },
});

export default deleteProductImage;