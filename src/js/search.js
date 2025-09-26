const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

let allProducts = [];

// 📦 Cargar solo los productos de tents.json
async function loadProducts() {
  try {
    const response = await fetch("/json/tents.json"); // 🔥 sin "public/"
    const data = await response.json();
    allProducts = data.filter(product => product.Name); // 🔥 usar Name
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

// 🔍 Buscar productos por nombre
function searchProducts(query) {
  const filtered = allProducts.filter(product =>
    product.Name.toLowerCase().includes(query.toLowerCase()) // 🔥 Name
  );
  displayResults(filtered);
}

// 🖼️ Mostrar resultados
// 🖼️ Mostrar resultados
function displayResults(products) {
    searchResults.innerHTML = "";

    if (products.length === 0) {
        searchResults.innerHTML = "<li>No se encontraron productos.</li>";
        return;
    }

    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = product.Name;

        // 🔗 Cuando hacen click, redirige a la página de detalle
        li.addEventListener("click", () => {
        window.location.href = `/product_pages/?product=${product.Id}`;
        });

        searchResults.appendChild(li);
    });
}


function debounce(callback, delay) {
    let timeout;
    return function () {
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
        callback.apply(null, args);
        }, delay);
    };
}

const debouncedSearch = debounce(() => {
    const query = searchInput.value.trim();
    if (query.length > 1) {
        searchProducts(query);
    } else {
        searchResults.innerHTML = "";
    }
}, 500);

searchInput.addEventListener("input", debouncedSearch);

loadProducts();
