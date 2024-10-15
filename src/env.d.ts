/// <reference path="../.astro/types.d.ts" />

interface User {
  email: string;
  name: string;
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
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly CLOUDINARY_API_KEY: string;
  readonly CLOUDINARY_API_SECRET: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
