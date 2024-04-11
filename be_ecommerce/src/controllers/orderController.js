const orderModel = require("../models/orderModel");

// Function to add order
const addOrder = async (req, res) => {
  const { user_id, total_amount, shipping_address_id, cartItems } = req.body;

  await orderModel
    .addOrder(user_id, total_amount, shipping_address_id, cartItems)
    .then((result) => {
      const orderId = result.rows;

      res
        .status(200)
        .json({ order_id: orderId, message: "Order created successfully" });
    })
    .catch((err) => {
      console.error("Error adding order:", err);
      res
        .status(500)
        .json({ error: "An error occurred while adding the order" });
    });
};

const getHistoryOrders = async (req, res) => {
  const { user_id } = req.params;

  orderModel
    .getHistoryOrders(user_id)
    .then((result) => {
      const orders = result.rows;
      res.status(200).json(orders);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching order history" });
    });
};

const getHistoryOrderDetail = async (req, res) => {
  const { user_id, order_id } = req.params;

  orderModel
    .getHistoryOrderDetail(user_id, order_id)
    .then((result) => {
      const orders = result.rows;
      res.status(200).json(orders);
    })
    .catch((error) => {
      console.error("Error fetching order history:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching order history" });
    });
};

module.exports = {
  addOrder,
  getHistoryOrders,
  getHistoryOrderDetail,
};
