
// main.js
import Alert from './alert.js'

const alert = new Alert('./json/alerts.json');
alert.loadAndDisplayAlerts();

import ProductData from './ProductData.mjs';
import ProductList from './ProductList';

const dataSource = new ProductData("tents");
const list = document.querySelector(".product-list");

const tentList = new ProductList("tents", dataSource, listElement);
thenList.init();

dataSource.getData().then(products => {
    console.log(products);
});
