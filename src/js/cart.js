import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Cart is Empty</p>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}
  

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Images?.PrimaryMedium || ''}" alt="${item.Name || ''}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name || ''}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'N/A'}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice || '0.00'}</p>
    </li>`;
}

renderCartContents();
