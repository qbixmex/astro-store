import { defineDb, defineTable, column } from 'astro:db';

//* https://astro.build/db/config

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    createdAt: column.date({ default: new Date() }),

    //* Relationship
    role: column.text({ references: () => Role.columns.id }),
  },
});

const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
  }
});

const Product = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    slug: column.text({ unique: true }),
    description: column.text(),
    price: column.number(),
    gender: column.text(),
    type: column.text(),
    stock: column.number(),
    tags: column.text(),
    sizes: column.text(),

    //* Relationship
    user: column.text({ references: () => User.columns.id }),
  },
});

const ProductImage = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    productId: column.text({ references: () => Product.columns.id }),
    image: column.text(),
    publicId: column.text({ optional: true, default: '' }),
  },
});

export default defineDb({
  tables: {
    User,
    Role,
    Product,
    ProductImage,
  }
});
