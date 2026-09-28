import express from "express";
import { Request, Response } from "express";
import insertProduct from "../services/insertProduct.js";
import pool from "../lib/db.js";
import { Product } from "../types/product.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const client = await pool.connect();

  try {
    // using postgreSQL functions
    // to aggregate images into a single array of objects
    // also with categories to save them as a json object
    const queryResult = await client.query(`
        SELECT p.id, 
	    p.title, 
	    p.price, 
	    p.discount_percentage, 
	    p.description, 
	    p.slug, 
	    p.creation_at, 
	    p.updated_at, 
	    json_build_object('id', c.id, 'name', c.name, 'slug', c.slug, 'image', c.image) AS category, 
        COALESCE(
            json_agg(
            json_build_object('url', pi.image)
            ) FILTER (WHERE pi.image_id IS NOT NULL), 
            '[]'::json
        ) AS images
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN categories c ON p.category_id = c.id 
        GROUP BY p.id, c.id;
        `);

    const products: Product[] = queryResult.rows;

    res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: error });
  } finally {
    client.release();
  }
});

// fetch products by category
router.get("/:category", async (req: Request, res: Response) => {
  const client = await pool.connect();
  const { category } = req.params;

  try {
    // using postgreSQL functions
    // to aggregate images into a single array of objects
    // also with categories to save them as a json object
    const queryResult = await client.query(
      `
        SELECT p.id, 
	    p.title, 
	    p.price, 
	    p.discount_percentage, 
	    p.description, 
	    p.slug, 
	    p.creation_at, 
	    p.updated_at, 
	    json_build_object('id', c.id, 'name', c.name, 'slug', c.slug, 'image', c.image) AS category, 
        COALESCE(
            json_agg(
            json_build_object('url', pi.image)
            ) FILTER (WHERE pi.image_id IS NOT NULL), 
            '[]'::json
        ) AS images
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE c.slug = $1
        GROUP BY p.id, c.id;
        `,
      [category],
    );

    const products: Product[] = queryResult.rows;

    res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: error });
  } finally {
    client.release();
  }
});

// fetch a product by id
router.get("/:category/:productId", async (req: Request, res: Response) => {
  const client = await pool.connect();
  const { productId } = req.params;

  try {
    // using postgreSQL functions
    // to aggregate images into a single array of objects
    // also with categories to save them as a json object
    const queryResult = await client.query(
      `
        SELECT p.id, 
	    p.title, 
	    p.price, 
	    p.discount_percentage, 
	    p.description, 
	    p.slug, 
	    p.creation_at, 
	    p.updated_at, 
	    json_build_object('id', c.id, 'name', c.name, 'slug', c.slug, 'image', c.image) AS category, 
        COALESCE(
            json_agg(
            json_build_object('url', pi.image)
            ) FILTER (WHERE pi.image_id IS NOT NULL), 
            '[]'::json
        ) AS images
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.id = $1
        GROUP BY p.id, c.id;
        `,
      [productId],
    );

    const product: Product = queryResult.rows[0];

    res.status(200).json({ success: true, product: product });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: error });
  } finally {
    client.release();
  }
});

// fetch products by search term
router.post("/search", async (req: Request, res: Response) => {
  const { debouncedSearchTerm } = req.body;
  const client = await pool.connect();

  try {
    // using postgreSQL functions
    // to aggregate images into a single array of objects
    // also with categories to save them as a json object
    const queryResult = await client.query(
      `
        SELECT p.id, 
	    p.title, 
	    p.price, 
	    p.discount_percentage, 
	    p.description, 
	    p.slug, 
	    p.creation_at, 
	    p.updated_at, 
	    json_build_object('id', c.id, 'name', c.name, 'slug', c.slug, 'image', c.image) AS category, 
        COALESCE(
            json_agg(
            json_build_object('url', pi.image)
            ) FILTER (WHERE pi.image_id IS NOT NULL), 
            '[]'::json
        ) AS images
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.title ILIKE $1
        GROUP BY p.id, c.id;
        `,
      [`%${debouncedSearchTerm}%`],
    );

    const products: Product[] = queryResult.rows;

    res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: error });
  } finally {
    client.release();
  }
});

router.post("/", async (req: Request, res: Response) => {
  const product = req.body;

  try {
    await insertProduct(product);

    res.status(200).json({ success: true, product: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.get("/images", async (req: Request, res: Response) => {
  const client = await pool.connect();

  try {
    const queryResult = await client.query("SELECT * FROM product_images");
    const images = queryResult.rows;

    res.status(200).json({ success: true, images: images });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  } finally {
    client.release();
  }
});

export default router;
