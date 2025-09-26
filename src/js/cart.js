import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
  <span class="remove" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (!cartItems.length) {
    document.querySelector(".product-list").innerHTML = "<li>No items in cart.</li>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", (e) => {
      const idToRemove = e.target.dataset.id;
      removeFromCart(idToRemove);
    });
  });
}

function removeFromCart(productId) {
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.filter(item => item.Id !== productId);
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}

renderCartContents();
