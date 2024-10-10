/// <reference path="../.astro/types.d.ts" />

interface User {
  email: string;
  name: string;
  // avatar: string;
  // emailVerified: boolean;
}

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: User | null;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_DOMAIN: string;
  readonly PUBLIC_AUTH_TRUST_HOST: string;
  readonly PUBLIC_AUTH_SECRET: string;
  readonly PUBLIC_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
