import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParam('product');

console.log('productId from URL:', productId);
if (!productId) {
  console.error('No product id in the URL');
} else {
  const product = dataSource.findProductById(productId);
  if (!product) {
    console.error('Product not found for id:', productId);
  } else {
    console.log('Producto encontrado:', product);
  }
}

console.log(product);



function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
