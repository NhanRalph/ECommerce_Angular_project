const client = require("../config/database");

// Function to add order
const addOrder = async (req, res) => {
  const { user_id, total_amount, shipping_address_id, cartItems } = req.body;

  try {
    // Start a transaction
    await client.query("BEGIN");

    // Insert the order into the database
    const orderQuery = `
      INSERT INTO orders (user_id, total_amount, shipping_address_id)
      VALUES ($1, $2, $3)
      RETURNING order_id
    `;
    const orderValues = [user_id, total_amount, shipping_address_id];
    const orderResult = await client.query(orderQuery, orderValues);
    const orderId = orderResult.rows[0].order_id;

    // Insert order details into the database
    const orderDetailsQuery = `
      INSERT INTO order_details (order_id, product_id, quantity, price)
      VALUES 
    `;
    const orderDetailsValues = cartItems
      .map(
        (item) =>
          `(${orderId}, ${item.product_id}, ${item.quantity_in_cart}, ${item.product_price})`
      )
      .join(", ");
    await client.query(orderDetailsQuery + orderDetailsValues);

    // Commit the transaction
    await client.query("COMMIT");

    res
      .status(200)
      .json({ order_id: orderId, message: "Order created successfully" });
  } catch (error) {
    // Rollback the transaction if any error occurs
    await client.query("ROLLBACK");
    console.error("Error adding order:", error);
    res.status(500).json({ error: "An error occurred while adding the order" });
  }
};

const getHistoryOrders = async (req, res) => {
  const { user_id } = req.params;

  const query = `
  select o.order_id, o.user_id, o.order_date, o.total_amount, a.address_id, a.address, a.city, a.country, a.client_name, a.client_phone
  from orders o 
  join address a on o.shipping_address_id = a.address_id
  where o.user_id = $1
  `;

  try {
    const result = await client.query(query, [user_id]);
    const orders = result.rows;
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching order history" });
  }
};

const getHistoryOrderDetail = async (req, res) => {
  const { user_id, order_id } = req.params;

  const query = `
  select o.order_id, o.user_id, od.product_id, p.product_name, p.img_path, od.quantity, od.price
  from orders o 
    join order_details od on o.order_id = od.order_id 
    join products p on p.product_id = od.product_id
  where o.user_id = $1 and o.order_id = $2
  `;

  try {
    const result = await client.query(query, [user_id, order_id]);
    const orders = result.rows;
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching order history" });
  }
};

module.exports = {
  addOrder,
  getHistoryOrders,
  getHistoryOrderDetail,
};
