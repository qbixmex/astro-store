import { defineAction } from 'astro:actions';
import { z } from 'astro:content';

const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
  }).refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
  }),
  handler: async () => {
    return { ok: true };
  },
});

export default registerUser;
