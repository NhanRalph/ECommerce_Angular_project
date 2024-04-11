const client = require("../config/database");

const getAllProducts = () => {
  return client.query("SELECT * FROM products ORDER BY quantity DESC");
};

const getCategoryProducts = (categoryName) => {
  return client.query(
    `SELECT products.product_id, products.product_name, products.price, products.quantity, products.img_path, products.category_id, product_categories.category_name 
    FROM products 
    JOIN product_categories ON products.category_id = product_categories.category_id
    WHERE product_categories.category_name LIKE $1
    ORDER BY products.quantity DESC`,
    [categoryName]
  );
};

const getProductByName = (name) => {
  return client.query(
    `SELECT products.product_id, products.product_name, products.price, products.quantity, products.img_path, products.category_id 
        FROM products 
        WHERE LOWER(product_name) LIKE '%' || LOWER($1) || '%'
        ORDER BY products.quantity DESC`,
    [name]
  );
};

const getProductQuantity = async (client, product_id) => {
  const getCurrentQuantityQuery = `
      SELECT quantity
      FROM products
      WHERE product_id = $1;
    `;
  const currentQuantityResult = await client.query(getCurrentQuantityQuery, [
    product_id,
  ]);
  return currentQuantityResult.rows[0].quantity;
};

const updateProductQuantity = async (client, product_id, newQuantity) => {
  const updateQuantityQuery = `
      UPDATE products
      SET quantity = $1
      WHERE product_id = $2;
    `;
  await client.query(updateQuantityQuery, [newQuantity, product_id]);
};

module.exports = {
  getAllProducts,
  getCategoryProducts,
  getProductByName,
  getProductQuantity,
  updateProductQuantity,
};
