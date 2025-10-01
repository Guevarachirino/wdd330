import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        try {
            this.product = await this.dataSource.findProductById(this.productId);
            if (!this.product) throw new Error("Product not found.");
            this.renderProductDetails();

            const addToCartButton = document.getElementById("add-to-cart");
            if (addToCartButton) {
                addToCartButton.addEventListener("click", this.addProductToCart.bind(this));
            } else {
                console.warn("Add to Cart button not found in DOM.");
            }
        } catch (err) {
            console.error("Failed to initialize product details:", err);
        }
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector("#p-image");
    if (productImage) {
        productImage.src = product.Images?.PrimaryExtraLarge || "";
        productImage.alt = product.NameWithoutBrand || "";
    }

    const euroPrice = new Intl.NumberFormat('de-DE',
        {
            style: 'currency',
            currency: 'EUR',
        }).format(Number(product.FinalPrice) * 0.85 || 0);
    const priceElement = document.querySelector("#p-price");
    if (priceElement) {
        priceElement.textContent = euroPrice;
    }

    const colorElement = document.querySelector("#p-color");
    if (colorElement) {
        colorElement.textContent = product.Colors[0]?.ColorName;
    }

    const descElement = document.querySelector("#p-description");
    if (descElement) {
        descElement.innerHTML = product.DescriptionHtmlSimple;
    }

    const addToCartButton = document.getElementById("add-to-cart");
    if (addToCartButton) {
        addToCartButton.dataset.id = product.Id || "";
    }
}