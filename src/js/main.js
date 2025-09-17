import ProductData from "./ProductData.mjs"

import ProductList from "./ProductList.mjs"

// Crear instancia de ProductData
const dataSource = new ProductData("tents");

// Obtener el elemento donde mostrar la lista
const listElement = document.querySelector(".product-list");

// Crear instancia de ProductList
const productList = new ProductList("tents", dataSource, listElement);



// IMPORTANTE: Llamar a init() para que se ejecute
productList.init();