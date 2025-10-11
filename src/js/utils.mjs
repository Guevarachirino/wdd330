// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
//week 3 (team activity) step 7
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}
// step 8 
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// step 9 header

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");
  
  const oldAlert = main.querySelector(".alert");
  if (oldAlert) {
    oldAlert.remove();
  }

  const alertBox = document.createElement("div");
  alertBox.className = "alert";
  alertBox.innerHTML = `
        <p>${message}</p>
        <button class="close-alert">&times;</button>
    `;
  
  alertBox.querySelector(".close-alert").addEventListener("click", () => {
    alertBox.remove();
  });

  main.prepend(alertBox);

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}