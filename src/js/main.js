import ProductData from "./ProductData.mjs"

import ProductList from "./ProductList.mjs"

import { getParam, loadHeaderFooter } from "./utils.mjs";

let category = getParam("category");
if (category === null || category.trim() === "") {
    category = "tents";
}
let dataSource = new ProductData(category);


const listElement = document.querySelector(".product-list");



let productList = new ProductList(category, dataSource, listElement);

loadHeaderFooter();

productList.init();

// import { loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();