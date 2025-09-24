
// main.js

/*import Alert from './alert.js';
const alert = new Alert('./public/json/alerts.json', 5000); // 5 segundos
alert.loadAndDisplayAlerts();

import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const tentList = new ProductList("tents", dataSource, listElement);

dataSource.getData().then(products => {
    console.log(products);
});*/
// main.js (o como se llame tu archivo principal)
// main.js (versión corregida)

import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';
import { loadHeaderFooter } from './utils.mjs';
import Alert from './alert.js';

document.addEventListener('DOMContentLoaded', () => {
  // Cargar header y footer
  loadHeaderFooter();

  // Cargar lista de productos
  const dataSource = new ProductData("tents");
  const listElement = document.querySelector(".product-list");
  const tentList = new ProductList("tents", dataSource, listElement);

  dataSource.getData().then(products => {
    console.log(products);
  });

  // Cargar alertas rotativas
  const alert = new Alert("/json/alerts.json");
  alert.loadAndDisplayAlerts();
});

