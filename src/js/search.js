export function initSearch(parent = document) {
    function debounce(callback, delay) {
        let timeout;
        return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(null, args), delay);
        };
    }

    async function loadProducts() {
        try {
            const response = await fetch("../public/json/tents.json");
            
            const data = await response.json();
        return data.filter((product) => product.Name);
        } catch (error) {
        console.error("Error cargando productos:", error);
        return [];
        }
    }

    const searchInput = parent.querySelector("#searchInput");
    const searchResults = parent.querySelector("#searchResults");
    if (!searchInput || !searchResults) return;

    loadProducts().then((allProducts) => {
        function displayResults(products) {
        searchResults.innerHTML = "";
        if (products.length === 0) {
            searchResults.innerHTML = "<li>We don't find any product.</li>";
            return;
        }
        products.forEach((product) => {
            const li = document.createElement("li");
            li.textContent = product.Name;
            li.addEventListener("click", () => {
            window.location.href = `/product_pages/?product=${product.Id}`;
            });
            searchResults.appendChild(li);
        });
        }

        function searchProducts(query) {
        const filtered = allProducts.filter((product) =>
            product.Name.toLowerCase().includes(query.toLowerCase())
        );
        displayResults(filtered);
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
    });
}
