function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.path = `public/json/${category}.json`;
  }
  async getData() {
    console.log("Fetching:", this.path);
    try {
      const response = await fetch(this.path);
      const data = await convertToJson(response);
      console.log("Fetched data:", data);
      return data;
    } catch (err) {
      console.error("Error fetching data:", err);
      throw err;
    }
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
