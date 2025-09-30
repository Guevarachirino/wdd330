import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const category = getParam("category");
const productId = getParam("product");

console.log("Category:", category);
console.log("Product ID:", productId);

if (!category || !productId) {
  console.error("Faltan parámetros en la URL");
  // Puedes mostrar un mensaje o manejar error aquí
}

const dataSource = new ProductData(category);

async function loadProduct() {
  try {
    const product = await dataSource.findProductById(productId);
    console.log(product);
    if (!product) {
      console.error("Producto no encontrado");
    }
    // Aquí seguirías renderizando tu producto
  } catch (error) {
    console.error("Error al buscar el producto:", error);
  }
}

loadProduct();
