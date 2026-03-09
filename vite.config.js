import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  base: "./",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        catalog: resolve(__dirname, "src/catalog.html"),
        bottleDetail: resolve(__dirname, "src/bottle-detail.html"),
        productsDetail: resolve(__dirname, "src/products-detail.html"),
        about: resolve(__dirname, "src/about.html"),
        contacts: resolve(__dirname, "src/contacts.html"),
        delivery: resolve(__dirname, "src/delivery.html"),
        sales: resolve(__dirname, "src/sales.html"),
        blog: resolve(__dirname, "src/blog.html"),
        blogDetail: resolve(__dirname, "src/blog-detail.html"),
        wholesale: resolve(__dirname, "src/wholesale.html"),
        reviews: resolve(__dirname, "src/reviews.html"),
        error: resolve(__dirname, "src/404.html"),
      },
    },
  },
  server: {
    open: true,
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    ViteImageOptimizer({
      test: /\.(jpe?g|png)$/i,
      includePublic: false,
      logStats: true,
      ansiColors: true,
      png: {
        quality: 80,
        palette: true,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      jpg: {
        quality: 80,
        progressive: true,
      },
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                cleanupIds: false,
              },
            },
          },
          "removeDimensions",
        ],
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: "fonts/**/*",
          dest: "assets/fonts",
        },
        {
          src: "favicon/**/*",
          dest: "assets/favicon",
        },
      ],
    }),
  ],
});
