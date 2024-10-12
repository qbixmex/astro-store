import { defineAction } from 'astro:actions';

const logoutSession = defineAction({
  accept: 'json',
  handler: async (_, { cookies: _cookies }) => {
    return { ok: true };
  },
});

export default logoutSession;
