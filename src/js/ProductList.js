export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.createList(list);
    }

    createList(list) {
        this.listElement.innerHTML = list.map(product =>
            `<li>${product.name} - ${product.price}</li>`).join("");
        
    }
}
