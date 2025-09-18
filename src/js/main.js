import ProductData from './ProductData.mjs';
import ProductList from './ProductList';

const dataSource = new ProductData("tents");
const list = document.querySelector(".product-list");

const tentList = new ProductList("tents", dataSource, listElement);
tentList.init();

