import { defineAction } from 'astro:actions';
import { z } from "astro:content";

const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z
      .string({ message: "Email is required !" })
      .email({ message: "Email format is invalid !" }),
    password: z
      .string({ message: "Password is required !" })
      .min(6, { message: "Password must be at least 6 characters long !" }),
    remember_me: z
      .boolean({ message: "Remember me must be a boolean value" })
      .optional(),
  }),
  handler: async (_input, _context) => {
    try {
      return {
        ok: true,
        message: "No error found on the form, cool 🎉",
      };
    } catch (error) {
      console.log((error as Error).message);

      throw new Error('Something went wrong 😢, check server logs ⚠️');
    }
  },
});

export default loginUser;