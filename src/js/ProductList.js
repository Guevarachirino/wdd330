import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
        <li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
                <h3>${product.Brand.Name}</h3>
                <p>${product.NameWithoutBrand}</p>
                <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
            </a>
        </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        try {
            const list = await this.dataSource.getData(this.category);
            this.createList(list);
            const titleElement = document.querySelector(".title");
            if (titleElement) {
                titleElement.textContent = this.category;
            }
        } catch (error) {
            console.error(`Failed to make product list: ${error}`);
        }
    }

    createList(list) {
        if (!Array.isArray(list)) {
            console.warn("No array, instead returns:", list);
            return;
        }
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
