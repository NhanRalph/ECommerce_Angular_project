const express = require("express");

const router = express.Router();

const { getABC, getNhanRalph } = require("../controllers/homeController");

const {
  getAllProducts,
  getCategoryProducts,
  getProductByName,
  updateQuantityProduct,
} = require("../controllers/productController");
const { getAllCategories } = require("../controllers/categoryController");
const {
  getQuantityInCart,
  addToCart,
  getCart,
  updateQuantity,
  deleteProductFromCart,
} = require("../controllers/cartController");
const {
  addAddress,
  getAddress,
  updateAddress,
} = require("../controllers/addressController");
const {
  addOrder,
  getHistoryOrders,
  getHistoryOrderDetail,
} = require("../controllers/orderController");
const { signin, getUser } = require("../controllers/authController");

//Endpoints for Get User
router.get("/get-user", getUser);

//Endpoints for Authen
router.post("/signin", signin);

// Endpoint to add a product to the cart
router.post("/add-to-cart", addToCart);
router.get("/quantity-in-cart", getQuantityInCart);
router.get("/cart", getCart);
router.put("/cart/update-quantity", updateQuantity);
router.delete(
  "/cart/delete-product/:cart_id/:product_id",
  deleteProductFromCart
);
// Endpoints for products and categories of it
router.get("/products", getAllProducts);
router.get("/products/:category", getCategoryProducts);
router.get("/products-name", getProductByName);
router.patch("/product/update-quantity/:product_id", updateQuantityProduct);
router.get("/categories", getAllCategories);

// Endpoints for address
router.get("/address", getAddress);
router.post("/address/add", addAddress);
router.put("/address/update", updateAddress);

// Endpoints for orders
router.post("/order/add", addOrder);
router.get("/order/history/:user_id", getHistoryOrders);
router.get("/order/history/:user_id/:order_id", getHistoryOrderDetail);

module.exports = router;
