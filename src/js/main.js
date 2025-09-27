
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
  // Cargar el header y el footer
  loadHeaderFooter();

  // Crear fuente de datos para los productos de la categoría "tents"
  const dataSource = new ProductData("tents");

  // Obtener el elemento donde se mostrarán los productos
  const listElement = document.querySelector(".product-list");

  // Crear la lista de productos
  const tentList = new ProductList("tents", dataSource, listElement);
  tentList.init(); // <-- asegúrate de que tu clase ProductList tenga un método init()

  // Cargar las alertas rotativas
  const alert = new Alert("/json/alerts.json"); // ✅ Ruta corregida (asumiendo que alerts.json está en public/json/)
  alert.loadAndDisplayAlerts();
});

