import { getLocalStorage } from "./utils.mjs";
window.getLocalStorage = getLocalStorage;

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");


  showCartTotal(cartItems);
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images[0]}"
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

renderCartContents();

//week 3 total cart

function calculateCartTotal(cartItems) {
  let total = 0;

  cartItems.forEach(item => {

    const price = parseFloat(item.FinalPrice);
    const quantity = 1;
    total += price * quantity;
  });

  return total;
}

function showCartTotal(cartItems) {
  if (!cartItems || cartItems.length === 0) return;

  const total = calculateCartTotal(cartItems);
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  cartFooter.classList.remove("hide");
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
