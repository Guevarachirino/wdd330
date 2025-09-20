
// main.js
import Alert from './alert.js'
const alert = new Alert('./json/alerts.json');
alert.loadAndDisplayAlerts();

import ProductData from './ProductData.mjs';
import ProductList from './ProductList.js';

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const tentList = new ProductList("tents", dataSource, listElement); // ✅

dataSource.getData().then(products => {
    console.log(products);
});
