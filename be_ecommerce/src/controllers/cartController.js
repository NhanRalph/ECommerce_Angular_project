const cartModel = require("../models/cartModel");

const getQuantityInCart = async (req, res) => {
  try {
    const quantity = await cartModel.getQuantityInCart();
    res.status(200).json({ quantity });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await cartModel.getCartItems();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    let cartId = await cartModel.checkCart(user_id);
    if (!cartId) {
      cartId = await cartModel.createCart(user_id);
    }
    await cartModel.addToCart(cartId, product_id, quantity);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while adding the product to the cart",
    });
  }
};

const updateQuantity = async (req, res) => {
  const { cart_id, product_id, quantity } = req.body;
  try {
    await cartModel.updateQuantityInCart(cart_id, product_id, quantity);
    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProductFromCart = async (req, res) => {
  const { cart_id, product_id } = req.params;
  try {
    await cartModel.deleteProductFromCart(cart_id, product_id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getQuantityInCart,
  getCart,
  addToCart,
  updateQuantity,
  deleteProductFromCart,
};
