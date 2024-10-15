import crypto from "node:crypto";
import { defineAction } from "astro:actions";
import { getSession } from "auth-astro/server";
import { z } from "astro:content";
import { db, eq, Product } from "astro:db";
import ImageUpload from "@/utils/image-upload";

const MAX_FILE_SIZE = 5_242_880; // 5 mb
const ACCEPTED_IMAGE_FILES = [
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/png",
  "image/svg+xml",
  "image/webp",
];

const createUpdateProduct = defineAction({
  accept: "form",

  input: z.object({
    id: z.string().optional(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    stock: z.number(),
    price: z.number(),
    sizes: z.string(),
    tags: z.string(),
    type: z.string(),
    gender: z.string(),

    imageFiles: z.array(
      z.instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maximum file size 5 mb"
        })
        .refine((file) => ACCEPTED_IMAGE_FILES.includes(file.type), {
          message: "Supported image file types are: (jpeg, jpg, gif, png, svg, webp)",
        })
    ).optional(),
  }),

  handler: async (form, { request }) => {
    const session = await getSession(request);
    const user = session?.user;

    if (!user) {
      throw new Error("Unauthorized Action, You must logged in !");
    }

    const {
      id = crypto.randomUUID(),
      imageFiles,
      ...formWithoutId
    } = form;

    //* Slugify the slug
    formWithoutId.slug = formWithoutId.slug.trim().replaceAll(" ", "-").toLowerCase();

    if (!form.id) {
      //* Create Product
      const result = await db.insert(Product).values({
        id,
        user: user.id!,
        ...formWithoutId,
      });

      if (result.rowsAffected === 0) {
        throw new Error("Failed to create product");
      };
    } else {
      //* Update Product
      const result = await db
        .update(Product)
        .set({
          user: user.id!,
          ...formWithoutId,
        })
        .where(
          eq(Product.id, id)
        );
      if (result.rowsAffected === 0) {
        throw new Error("Failed to update product");
      };
    }

    if (imageFiles && imageFiles.length > 0 ) {
      imageFiles.forEach(async (image) => {

        if (image.size <= 0) return; 

        const result = await ImageUpload.load(image);

        console.log(result);

      });
    }

    return {
      ok: true,
      message: "Product Saved Successfully",
      product: {
        id,
        user: user.id!,
        ...formWithoutId,
      },
    };
  },
});

export default createUpdateProduct;