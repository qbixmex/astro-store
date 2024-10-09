import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(
  async (context, next) => {
    const session = await getSession(context.request);
    const user = session?.user;

    const isLoggedIn = !!session;
    
    context.locals.isLoggedIn = isLoggedIn;
    context.locals.user = null;
    context.locals.isAdmin = false;

    if (user) {
      context.locals.user = {
        name: session?.user?.name!,
        email: session?.user?.email!,
        // TODO: avatar: context.user.photoURL ?? '',
        // TODO: emailVerified: user.emailVerified,
      };
      context.locals.isAdmin = user.role === "admin";
    }

    if (!context.locals.isAdmin && context.url.pathname.startsWith('/dashboard')) {
      return context.redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(context.url.pathname)) {
      return context.redirect('/');
    }

    return next();
  }
);
