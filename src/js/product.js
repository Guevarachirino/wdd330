import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import getParam from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam('product');

console.log(dataSource.findProductById(productId));
/*
function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
*/

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart") || [];
  const cartProducts = cart.find((item) => item.Id === product.Id);

  if (cartProducts) {
    cartProducts.quantity = (cartProducts.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
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
