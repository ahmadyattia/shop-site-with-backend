import { Product } from "../types/product.js";
import pool from "../lib/db.js";
import format from "pg-format";

/*
Insert a product using a db transaction.
Images are added in an images table and the rest of the
properties of the product are added in the products table.
The category is added by its id and lives in a categories table.

pg-format used to add the variable number of images of a product 
in the db.
*/

export default async function insertProduct(product: Product) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const selectCategoryIdText = "SELECT id FROM categories WHERE name = $1";

    const categoryIdQueryResult = await client.query(selectCategoryIdText, [
      product.category.name,
    ]);

    const categoryId = categoryIdQueryResult.rows[0].id;

    const productQueryText =
      "INSERT INTO products (title, price, category, discount_percentage, description, slug, creation_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;";
    const queryValues = [
      product.title,
      product.price,
      categoryId,
      product.discountPercentage,
      product.description,
      product.slug,
      product.creationAt,
      product.updatedAt,
    ];

    const productResult = await client.query(productQueryText, queryValues);
    const newProductId = productResult.rows[0].id;

    const imageRows = product.images.map((image) => [newProductId, image]);

    const imagesQuery = format(
      "INSERT INTO product_images (product_id, image) VALUES %L;",
      imageRows,
    );

    await client.query(imagesQuery);

    await client.query("COMMIT;");
  } catch (error) {
    await client.query("ROLLBACK;");
    console.error(
      "Error completing the transaction of adding a product:",
      error,
    );
    throw error;
  } finally {
    // release the client back to the pool
    client.release();
  }
}
