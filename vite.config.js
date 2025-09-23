import { resolve } from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';//new, trying to fix the error 


export default defineConfig({
  root: "src/",

  /*build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },*/
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),

      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/public',  // carpeta que quieres copiar (json e imagenes)
          dest: '', // raíz del dist
        }
      ]
    })
  ]
});
