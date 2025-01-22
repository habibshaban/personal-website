# **Nuxt Minimal Starter** 🚀

This is my personal Nuxt starter setup. If you're new to Nuxt or need a refresher, check out the [official documentation](https://nuxt.com/docs/getting-started/introduction).

---

## **🔧 Setup**

First, install the dependencies using your preferred package manager:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

---

## **🚀 Development**

Start the development server at `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

---

## **📦 Production**

To build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Preview the production build locally:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

For full deployment details, check out the [Nuxt deployment guide](https://nuxt.com/docs/getting-started/deployment).

---

## **📁 Folder Structure**

A well-structured project keeps everything organized and scalable:

```
📂 personal-website
│── 📂 assets/        # Global styles, images, fonts
│── 📂 components/    # Reusable Vue components (Navbar, Footer, etc.)
│── 📂 composables/   # Reusable logic (e.g., fetch API, utils)
│── 📂 content/       # Markdown files for blogs/journals (if using Nuxt Content)
│── 📂 layouts/       # Page layouts (default.vue, blog.vue, etc.)
│── 📂 middleware/    # Route middlewares (if needed)
│── 📂 pages/         # Main pages (index.vue, about.vue, blog.vue, etc.)
│── 📂 public/        # Static assets (favicons, open graph images)
│── 📂 plugins/       # Vue plugins (e.g., form validation, analytics)
│── 📂 stores/        # Pinia store (if using state management)
│── 📂 styles/        # Global SCSS or Tailwind config
│── 📂 utils/         # Helper functions (e.g., date formatters)
│── 📂 server/        # Future API routes if I add a backend
│── 📜 nuxt.config.ts # Nuxt configuration file
│── 📜 package.json   # Dependencies and scripts
│── 📜 .gitignore     # Ignore unnecessary files
```
