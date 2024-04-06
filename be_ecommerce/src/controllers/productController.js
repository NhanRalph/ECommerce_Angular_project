const client = require("../config/database");

const getAllProducts = (req, res) => {
  client.query(
    "SELECT * FROM products ORDER BY quantity DESC",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const products = result.rows;
      res.status(200).json(products);
    }
  );
};

const getCategoryProducts = (req, res) => {
  const categoryName = req.params.category; // Assuming category name is passed as a URL parameter

  client.query(
    `SELECT products.product_id, products.product_name, products.price, products.quantity, products.img_path, products.category_id, product_categories.category_name 
    FROM products 
    JOIN product_categories ON products.category_id = product_categories.category_id
    WHERE product_categories.category_name LIKE $1
    ORDER BY products.quantity DESC`,
    [categoryName],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const products = result.rows;
      res.status(200).json(products);
    }
  );
};

const getProductByName = (req, res) => {
  const { name } = req.query;

  client.query(
    `SELECT products.product_id, products.product_name, products.price, products.quantity, products.img_path, products.category_id 
    FROM products 
    WHERE LOWER(product_name) LIKE '%' || LOWER($1) || '%'
    ORDER BY products.quantity DESC`,
    [name],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const products = result.rows;
      res.status(200).json(products);
    }
  );
};
const updateQuantityProduct = async (req, res) => {
  const { product_id } = req.params;
  const { quantity } = req.body;

  try {
    // Get the current quantity of the product
    const getCurrentQuantityQuery = `
      SELECT quantity
      FROM products
      WHERE product_id = $1;
    `;
    const currentQuantityResult = await client.query(getCurrentQuantityQuery, [
      product_id,
    ]);
    const currentQuantity = currentQuantityResult.rows[0].quantity;

    // Calculate the new quantity
    const newQuantity = currentQuantity - quantity;

    // Check if new quantity is less than zero
    if (newQuantity < 0) {
      return res.status(400).json({ error: "Quantity cannot be negative" });
    }

    // Update the quantity of the product
    const updateQuantityQuery = `
      UPDATE products
      SET quantity = $1
      WHERE product_id = $2;
    `;
    await client.query(updateQuantityQuery, [newQuantity, product_id]);

    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getCategoryProducts,
  getProductByName,
  updateQuantityProduct,
};
