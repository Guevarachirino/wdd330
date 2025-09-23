export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.createList(list);
    }

    createList(list) {
        this.listElement.innerHTML = list.map(product =>
            `<li>${product.name} - ${product.price}</li>`).join("");
        
    }
}

//array for product_listing index.html 
const categories = [
  { name: 'Tents', image: 'tents.svg', link: '/src/product_listing/index.html?category=tents' },
  { name: 'Backpacks', image: 'backpacks.svg', link: '/src/product_listing/index.html?category=backpacks' },
  { name: 'Sleeping Bags', image: 'sleepingbags.svg', link: '/src/product_listing/index.html?category=sleeping-bags' },
  { name: 'Hammocks', image: 'hammocks.svg', link: '/src/product_listing/index.html?category=hammocks' }
];

function displayCategories() {
  const container = document.querySelector('.categories-container');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <div class="category-item">
      <a href="${cat.link}">
        <img src="/src/public/images/${cat.image}" alt="${cat.name}" />
        <span>${cat.name}</span>
      </a>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', displayCategories);
