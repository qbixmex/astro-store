/// <reference path="../.astro/types.d.ts" />

import { User } from "@/interfaces"; 

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    user: User | null;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
