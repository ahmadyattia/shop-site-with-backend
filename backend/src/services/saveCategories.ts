import { Product } from "../types/product.js";
import insertCategory from "./insertCategory.js";

export default function saveCategories(products: Product[]) {
  const categories = products.map((product) => product.category);

  const seenNames = new Set();

  const uniqueCategories = categories.filter((category) => {
    if (seenNames.has(category.name)) {
      return false;
    }

    seenNames.add(category.name);
    return true;
  });

  console.log(uniqueCategories);

  uniqueCategories.forEach(async (category) => {
    try {
      await insertCategory(category);
    } catch (error) {
      console.error("Error saving categories to the db:", error);
    }
  });
}
