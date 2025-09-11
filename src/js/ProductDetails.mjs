import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        const addToCartBtn = document.getElementById('addToCart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', this.addProductToCart.bind(this));
        }
    }

    addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];
    const cartProducts = cart.find((item) => item.Id === this.product.Id);

    if (cartProducts) {
        cartProducts.quantity = (cartProducts.quantity || 1) + 1;
    } else {
        this.product.quantity = 1;
        cart.push(this.product);
    }

    setLocalStorage('so-cart', cart);
}

    renderProductDetails() {
        const details = document.querySelector('.product-detail');

        details.innerHTML = `<h3>${this.product.Name}</h3>
        <img src="${this.product.Image}" alt="${this.product.Name}" />
        <p class="product-card-price">${this.product.FinalPrice}</p>
        <p>${this.product.DescriptionHtmlSimple}</p>
        <button id="addToCart">Add to Cart</button>`;
    }
}
