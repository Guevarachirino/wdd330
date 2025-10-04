// import ProductData from "./ProductData.mjs"

// import ProductList from "./ProductList.mjs"

// import { loadHeaderFooter } from "./utils.mjs";


// const dataSource = new ProductData("tents");


// const listElement = document.querySelector(".product-list");


// const productList = new ProductList("tents", dataSource, listElement);

// loadHeaderFooter();

// productList.init();

import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

let category = getParam("category");
console.log("🔥🔥🔥 EJECUTANDO PRODUCT-LISTING.JS 🔥🔥🔥");
console.log("Archivo:", import.meta.url);

console.log("Categoría obtenida:", category);

if (!category || category.trim() === "") {
    category = "sleeping-bags";
}

console.log("Categoría final:", category);

const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);


listing.init();