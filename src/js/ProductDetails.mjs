import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = null;
        this.dataSource = dataSource;
    }

    async init() {
        try {
            this.product = await this.dataSource.findProductById(this.productId);

            if (!this.product) {
                console.error(`Product with ID "${this.productId}" not found.`);
                this.renderNotFound();
                return;
            }

            this.renderProductDetails();

            document
                .getElementById("addToCart")
                ?.addEventListener("click", this.addProductToCart.bind(this));
        } catch (err) {
            console.error("Error initializing product details:", err);
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

    renderNotFound() {
        const container = document.querySelector(".product-detail");
        if (container) {
            container.innerHTML = `<p class="error">Sorry, product not found.</p>`;
        }
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    if (productImage) {
        productImage.src = product.Image || "images/default.jpg";
        productImage.alt = product.NameWithoutBrand || "Product image";
    }

    document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
}