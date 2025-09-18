import ProductData from './ProductData.mjs';
import ProductList from './ProductList';
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const list = document.querySelector(".product-list");
const tentList = new ProductList(category, dataSource, list);
tentList.init();

