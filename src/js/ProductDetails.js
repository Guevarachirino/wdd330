import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();
      
    if (this.product.Colors && this.product.Colors.length > 0) {
      renderColorSwatches(this.product.Colors, this.product.Colors[0], this.product);
    }

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
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
  document.querySelector("h1").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  // Mostrar la imagen del primer color por defecto si existe
  if (product.Colors && product.Colors.length > 0) {
    productImage.src = product.Colors[0].ColorPreviewImageSrc;
    productImage.alt = product.Colors[0].ColorName;
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  } else {
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;
    document.getElementById("productColor").textContent = "";
  }

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productDescription").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;
}

// Renderiza los swatches y permite seleccionar color
function renderColorSwatches(colors, selectedColor, product) {
  const swatchContainer = document.getElementById("colorSwatches");
  swatchContainer.innerHTML = "";

  colors.forEach((color, idx) => {
    const swatch = document.createElement("button");
    swatch.className = "color-swatch";
    swatch.title = color.ColorName;
    swatch.style.background = `url('${color.ColorChipImageSrc}') center/cover no-repeat`;
    swatch.dataset.color = color.ColorCode;
    if (selectedColor.ColorCode === color.ColorCode) {
      swatch.classList.add("selected");
    }
    swatch.onclick = () => {
      // Quitar selección previa
      document.querySelectorAll(".color-swatch").forEach(btn => btn.classList.remove("selected"));
      swatch.classList.add("selected");
      // Cambiar imagen y nombre de color
      const mainImg = document.getElementById("productImage");
      if (mainImg && color.ColorChipImageSrc) {
        mainImg.src = color.ColorPreviewImageSrc;
        mainImg.alt = color.ColorName;
      }
      const colorName = document.getElementById("productColor");
      if (colorName) colorName.textContent = color.ColorName;
    };
    swatchContainer.appendChild(swatch);
  });
}