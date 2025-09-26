const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

let allProducts = [];


async function loadProducts() {
    try {
        const response = await fetch("/json/tents.json");
        const data = await response.json();
        allProducts = data.filter(product => product.Name); 
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}


function searchProducts(query) {
    const filtered = allProducts.filter(product =>
        product.Name.toLowerCase().includes(query.toLowerCase()) // 🔥 Name
    );
    displayResults(filtered);
}


function displayResults(products) {
    searchResults.innerHTML = "";

    if (products.length === 0) {
        searchResults.innerHTML = "<li>No se encontraron productos.</li>";
        return;
    }

    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = product.Name;

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
