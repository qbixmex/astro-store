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

    if (user) {
      // TODO:
      context.locals.user = {
        name: session?.user?.name!,
        email: session?.user?.email!,
        // avatar: context.user.photoURL ?? '',
        // emailVerified: user.emailVerified,
      };
      // context.locals.isAdmin = user.role === "admin";
    }

    // TODO: Eventually we have to control access by roles
    if (!isLoggedIn && context.url.pathname.startsWith('/dashboard')) {
      return context.redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(context.url.pathname)) {
      return context.redirect('/');
    }

    return next();
  }
);
