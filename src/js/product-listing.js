import ProductData from '../ProductData.mjs';
import ProductList from '../ProductList.mjs';
import { loadHeaderFooter } from '../utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    await loadHeaderFooter();

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'tents';

    const dataSource = new ProductData(category);
    const listElement = document.querySelector(".product-list");
    const productList = new ProductList(category, dataSource, listElement);

    // Aquí llamamos a init para que haga todo: obtener datos y renderizar
    await productList.init();
});

const categories = [
    { name: 'Tents', image: '/src/public/images/tents.svg', link: '/src/product_listing/index.html?category=tents' },
    { name: 'Backpacks', image: '/src/public/images/backpacks.svg', link: '/src/product_listing/index.html?category=backpacks' },
    { name: 'Sleeping Bags', image: '/src/public/images/sleepingbags.svg', link: '/src/product_listing/index.html?category=sleeping-bags' },
    { name: 'Hammocks', image: '/src/public/images/hammocks.svg', link: '/src/product_listing/index.html?category=hammocks' }
];

function displayCategories() {
    console.log('displayCategories running...');
    const container = document.querySelector('.categories-container');
    if (!container) {
        console.log('No container found!');
        return; // Salir si no encuentra el contenedor
    }
    container.innerHTML = categories.map(cat => `
        <div class="category-item">
            <a href="${cat.link}">
                <img src="${cat.image}" alt="${cat.name}" />
                <span>${cat.name}</span>
            </a>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', displayCategories);
