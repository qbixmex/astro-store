# Astro Shop

## Installation

```bash
# BUN
npm install

# YARN
yarn i

# PNPM
pnpm i

# BUN
bun i
```

## Development Mode

```bash
# BUN
npm run dev

# YARN
yarn dev

# PNPM
pnpm dev

# BUN
bun dev
```

## Production Build

```bash
# BUN
npm run build

# YARN
yarn run build

# PNPM
pnpm run build

# BUN
bun run build
```

## Preview

Run this command to check production build.

__NOTE: In order to run this command, you must build your application before.__

```bash
# BUN
npm run preview

# YARN
yarn preview

# PNPM
pnpm preview

# BUN
bun preview
```

## Generate Auth Secret Key

```bash
node
require("node:crypto").randomBytes(32).toString('hex');

# It will generate something like this:
'1f135548a57a4e2c043d6eb6a6b5e144 and more ...'
```

### Copy the generated numbers and paste them into: .env -> ```AUTH_SECRET``` environment variable value:

```ini
AUTH_SECRET=1f135548a57a4e2c043d6eb6a6b5e144...

# Note: the three dots means there are more numbers and characters.
AUTH_SECRET=1f135548a57a4e2c043d6eb6a6b5e144...
```