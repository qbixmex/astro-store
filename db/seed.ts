import crypto from "node:crypto";
import { db, Product, ProductImage, Role, User } from "astro:db";
import { seedProducts } from "./seed-data";

const roles = [
	{ id: 'admin', name: 'Administrator' },
	{ id: 'user', name: 'System User' }
];

const user1 = {
	id: "22c57930-d228-41c7-84fa-ce2444b29e59",
	name: 'Albert Einstein',
	email: 'albert@gmail.com',
	password: "$2a$10$BWTWhshbI2nbEtA/ixrSw.rLLtwc4OvWEZy4abN9MAKFqLvHghI5y",
	role: 'user',
};

const user2 = {
	id: "931af05e-5662-4701-b775-d4937378a3d5",
	name: 'Daniel Gonzalez',
	email: 'qbixmex@gmail.com',
	password: "$2a$10$CPvBuQedmm23HpaTFJni5Ome.5tdL2tlcpc/TcVjRPfu.O96QQIIK",
	role: 'admin',
};

//? Check more information at: https://astro.build/db/seed
const seed = async () => {
	await db.insert(Role).values(roles);
	await db.insert(User).values([ user1, user2 ]);

	const queries: any = [];

	seedProducts.forEach((item) => {
	
		const product = {
			id: crypto.randomUUID(),
			description: item.description,
			stock: item.stock,
			price: item.price,
			sizes: item.sizes.join(','),
			slug: item.slug,
			tags: item.tags.join(','),
			title: item.title,
			type: item.type,
			gender: item.gender,
			user: user2.id,
		};
	
		queries.push(db.insert(Product).values(product));
	
		item.images.forEach((imageURL) => {
	
			const productImage = {
				id: crypto.randomUUID(),
				productId: product.id,
				image: imageURL,
			};
	
			queries.push(db.insert(ProductImage).values(productImage));
	
		});
	
	});

	await db.batch(queries);
};

export default seed;
