import { defineConfig } from 'auth-astro';
import Credentials from "@auth/core/providers/credentials";
import { db, eq, User } from 'astro:db';
import bcrypt from 'bcryptjs';
import type { AdapterUser } from '@auth/core/adapters';

export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        //* Find user by email.
        const [user] = await db.
          select()
          .from(User)
          .where(
            eq(User.email, email as string)
          );

        //* Check if user exists in DB.
        if (!user) {
          throw new Error("User not found");
        }

        //* Check if passwords match.
        if (!bcrypt.compareSync(password as string, user.password)) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      const { createdAt, ...tokenUser } = token.user as AdapterUser;
      session.user = tokenUser;
      return session;
    },
  }
});