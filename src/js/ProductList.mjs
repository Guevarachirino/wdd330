import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
            <img src="${product.Image}" alt="${product.Name}" />
            <h3>${product.Name}</h3> 
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
        const list = await this.dataSource.getData(this.category);
        console.log(list); 
        this.createList(list);
    }

    createList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}
