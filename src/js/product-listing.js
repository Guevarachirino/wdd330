import ProductData from './ProductData.mjs';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const list = document.querySelector(".product-list");

if (category && list) {
    const productList = new ProductList(category, new ProductData(), list);
    productList.init();
} else {
    console.error("Missing category or product list container.");
}

