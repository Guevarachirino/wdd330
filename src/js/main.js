
// main.js

import Alert from './alert.js';
const alert = new Alert('./public/json/alerts.json', 5000); // 5 segundos
alert.loadAndDisplayAlerts();

import ProductData from './ProductData.mjs';
import ProductList from './ProductList.js';

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const tentList = new ProductList("tents", dataSource, listElement);

dataSource.getData().then(products => {
    console.log(products);
});

//week 3, step 10(team activity)
import { loadHeaderFooter } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
});