import { Category } from "../types/category.js";
import pool from "../lib/db.js";

export default async function insertCategory(category: Category) {
  const client = await pool.connect();

  try {
    const queryText =
      "INSERT INTO categories (name, slug, image) VALUES ($1, $2, $3) RETURNING id";
    const queryResult = await client.query(queryText, [
      category.name,
      category.slug,
      category.image,
    ]);

    const categoryId: number = queryResult.rows[0].id;

    return categoryId;
  } catch (error) {
    console.error("Error adding the category to the db:", error);
    throw error;
  } finally {
    client.release();
  }
}
