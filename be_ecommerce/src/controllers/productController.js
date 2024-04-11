const productModel = require("../models/productModel.js");

const getAllProducts = (req, res) => {
  productModel
    .getAllProducts()
    .then((result) => {
      const products = result.rows;
      res.status(200).json(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getCategoryProducts = (req, res) => {
  const categoryName = req.params.category; // Assuming category name is passed as a URL parameter
  productModel
    .getCategoryProducts(categoryName)
    .then((result) => {
      const products = result.rows;
      res.status(200).json(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getProductByName = (req, res) => {
  const { name } = req.query;

  productModel
    .getProductByName(name)
    .then((result) => {
      const products = result.rows;
      res.status(200).json(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
const updateQuantityProduct = async (req, res, client) => {
  const { product_id } = req.params;
  const { quantity } = req.body;

  try {
    const currentQuantity = await getProductQuantity(client, product_id);

    const newQuantity = currentQuantity - quantity;

    if (newQuantity < 0) {
      return res.status(400).json({ error: "Quantity cannot be negative" });
    }

    await updateProductQuantity(client, product_id, newQuantity);

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
