import crypto from "node:crypto";
import { defineAction } from "astro:actions";
import { getSession } from "auth-astro/server";
import { z } from "astro:content";
import { db, eq, Product, ProductImage } from "astro:db";
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

    const queries: any = [];

    if (!form.id) {
      //* Create Product
      queries.push(db.insert(Product).values({ id, user: user.id!, ...formWithoutId }));
    } else {
      //* Update Product
      queries.push(
        db
          .update(Product)
          .set({ user: user.id!, ...formWithoutId })
          .where(eq(Product.id, id))
      );
    }

    const productImages: {
      secureUrl: string;
      publicId: string;
    }[] = [];

    if (
      imageFiles !== undefined
      && imageFiles.length > 0
      && imageFiles[0].size > 0
    ) {
      const uploadApiResponses = await Promise.all(
        imageFiles.map((file) => ImageUpload.load(file))
      );

      uploadApiResponses.forEach((response) => {
        return productImages.push({
          secureUrl: response.secure_url,
          publicId: response.public_id
        });
      });

      productImages.forEach(image => {
        const imageRecord = {
          id: crypto.randomUUID(),
          image: image.secureUrl,
          productId: id,
          publicId: image.publicId,
        };
        queries.push(db.insert(ProductImage).values(imageRecord));
      });
    }

    await db.batch(queries);

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