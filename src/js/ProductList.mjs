// import { renderListWithTemplate } from "./utils.mjs";

// function productCardTemplate(product) {
//     return `<li class="product-card">
//         <a href="product_pages/?product=${product.Id}">
//         <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
//         <h2 class="card__brand">${product.Brand.Name}</h2>
//         <h3 class="card__name">${product.Name}</h3>
//         <p class="product-card__price">$ ${product.ListPrice}</p>
//         </a>
//     </li>`
// }

// export default class ProductList {
//     constructor(category, dataSource, listElement) {
//         this.category = category;
//         this.dataSource = dataSource;
//         this.listElement = listElement;
//         console.log(this.category);
//     }
//     async init() {
//         const list = await this.dataSource.getData(this.category);
//         this.render(list);
//         const hammocks = await this.dataSource.getData("hammocks");
//         console.log(hammocks);
//         document.querySelector(".title").textContent = this.category;
//     }
//     render(list) {
//         renderListWithTemplate(productCardTemplate, this.listElement, list);
//     }
// }

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
        <img class="yara" src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    // console.log("📦 ProductList creado con categoría:", this.category);
  }

  async init() {
    try {
      // console.log("🚀 Cargando productos de:", this.category);
      const list = await this.dataSource.getData(this.category);
      // console.log("📋 Productos recibidos:", list.length);

      this.render(list);

      // Actualizar título si existe
      const titleElement = document.querySelector(".title");
      if (titleElement) {
        const formattedCategory = this.category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        titleElement.textContent = formattedCategory;
      }

      // console.log("✅ Productos renderizados exitosamente");
    } catch (error) {
      // console.error("❌ Error en init():", error);
      this.listElement.innerHTML =
        
        `<li class="error">Error al cargar productos</li>`;
    }
  }

  render(list) {
    if (!list || list.length === 0) {
      this.listElement.innerHTML = "<li>No se encontraron productos</li>";
      return;
    }
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
