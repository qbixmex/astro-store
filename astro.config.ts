// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

import icon from "astro-icon";

import db from '@astrojs/db';

import auth from 'auth-astro';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), db(), auth(), react()],
  output: "server",
  adapter: netlify(),
});