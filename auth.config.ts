import { defineConfig } from 'auth-astro';
import Credentials from "@auth/core/providers/credentials";
import { db, eq, User } from 'astro:db';
import bcrypt from 'bcryptjs';

export default defineConfig({
  providers: [
    Credentials({
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

        //* Remove password from user object
        const {password: _, ...authUser} = user;

        return authUser;
      },
    }),
  ],
});