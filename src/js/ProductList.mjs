import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html">
      <img src="${product.Image}" alt="${product.Name}" />
    </a>
    <a href="product.html?product=${product.Id}">
      <h3>${product.Name}</h3>
    </a>
    <p>Price: $${product.FinalPrice}</p>
  </li>`;
}   

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        try {
            const list = await this.dataSource.getData();
            this.renderList(list);
        } catch (error) {
            console.error("Failed to initialize product list:", error);
            this.listElement.innerHTML = `<li class="error">Failed to load products.</li>`;
        }
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}
