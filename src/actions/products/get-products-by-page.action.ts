import type { ProductWithImages } from "@/interfaces";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, count, Product, ProductImage, sql } from "astro:db";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

const getProductsByPage = defineAction({
  accept: "json",
  input: z.object({
    page: z.number().optional().default(DEFAULT_PAGE),
    limit: z.number().optional().default(DEFAULT_LIMIT),
  }),
  handler: async ({ page = 1, limit = DEFAULT_LIMIT }) => {
    //* Ensure avoid negative page numbers.
    if (page <= 0) page = 1;

    const [ totalRecords ] = await db.select({ count: count() }).from(Product);
    const totalPages = Math.ceil(totalRecords.count / limit);

    if ( page > totalPages) {
      return {
        products: [] as ProductWithImages[],
        totalPages,
      };
    }

    const rawQuery = sql`
      SELECT product.id, product.title, product.slug, product.price, product.stock, (
        SELECT GROUP_CONCAT(image, ',')
        FROM (
          SELECT *
          FROM ${ProductImage}
          WHERE productId = product.id LIMIT 2
        )
      ) as images
      FROM ${Product} product
      LIMIT ${limit}
      OFFSET ${(page - 1) * limit}
    `;

    const { rows } = await db.run(rawQuery);

    return {
      products: rows as unknown as ProductWithImages[],
      totalPages,
    };
  },
});

export default getProductsByPage;
