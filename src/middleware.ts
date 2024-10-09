import { defineMiddleware } from 'astro:middleware';

// const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(
  async (context, next) => {
    const isLoggedIn = false;
    
    // TODO:
    context.locals.isLoggedIn = isLoggedIn;
    // context.locals.user = null;

    // if (context.locals.user) {
      // TODO:
      // locals.user = {
      //   avatar: user.photoURL ?? '',
      //   email: user.email!,
      //   name: user.displayName!,
      //   emailVerified: user.emailVerified,
      // };
    // }

    // TODO: Eventualmente tenemos que controlar el acceso por roles
    // if (!isLoggedIn && context.url.pathname.startsWith('/dashboard')) {
    //   return context.redirect('/');
    // }

    // if (isLoggedIn && notAuthenticatedRoutes.includes(context.url.pathname)) {
    //   return context.redirect('/');
    // }

    return next();
  }
);
