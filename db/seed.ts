import { db, Role, User } from 'astro:db';

const roles = [
	{ id: 'admin', name: 'Administrator' },
	{ id: 'user', name: 'System User' }
];

const users = [
	{
		id: "22c57930-d228-41c7-84fa-ce2444b29e59",
		name: 'Albert Einstein',
		email: 'albert@gmail.com',
		password: "$2a$10$BWTWhshbI2nbEtA/ixrSw.rLLtwc4OvWEZy4abN9MAKFqLvHghI5y",
		role: 'admin',
	},
	{
		id: "22c57930-d228-41c7-84fa-ce2444b29e59",
		name: 'Daniel Gonzalez',
		email: 'qbixmex@gmail.com',
		password: "$2a$10$CPvBuQedmm23HpaTFJni5Ome.5tdL2tlcpc/TcVjRPfu.O96QQIIK",
		role: 'admin',
	},
];

//? Check more information at: https://astro.build/db/seed
const seed = async () => {
	await db.insert(Role).values(roles);
	await db.insert(User).values(users);
};

export default seed;
