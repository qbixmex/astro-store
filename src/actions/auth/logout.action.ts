import { defineAction } from 'astro:actions';

const logout = defineAction({
  accept: 'json',
  handler: async (_, { cookies }) => {
    return { ok: true };
  },
});

export default logout;
