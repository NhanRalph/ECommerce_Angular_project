const client = require("../config/database");

const getQuantityInCart = async () => {
  try {
    const result = await client.query("SELECT COUNT(*) FROM cart_items");
    return result.rows[0].count;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const getCartItems = async (user_id) => {
  try {
    const result = await client.query(
      `
      SELECT 
        p.product_id,
        p.product_name,
        c.cart_id,
        p.price AS product_price,
        ci.quantity AS quantity_in_cart,
        p.quantity AS max_quantity,
        (ci.quantity * p.price) AS total_price,
        p.img_path
      FROM 
        cart_items ci
      JOIN 
        products p ON ci.product_id = p.product_id
      JOIN 
        cart c ON ci.cart_id = c.cart_id
      WHERE c.user_id = $1;
    `,
      [user_id]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const checkCart = async (user_id) => {
  try {
    const result = await client.query(
      "SELECT cart_id FROM cart WHERE user_id = $1",
      [user_id]
    );
    return result.rows.length ? result.rows[0].cart_id : null;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const createCart = async (user_id) => {
  try {
    const result = await client.query(
      "INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id",
      [user_id]
    );
    return result.rows[0].cart_id;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const addToCart = async (cartId, productId, quantity) => {
  try {
    await client.query("BEGIN");

    const checkProductQuery =
      "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2";
    const { rows } = await client.query(checkProductQuery, [cartId, productId]);

    if (rows.length === 0) {
      const addProductToCartQuery =
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)";
      await client.query(addProductToCartQuery, [cartId, productId, quantity]);
    } else {
      const updateProductQuery =
        "UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3";
      await client.query(updateProductQuery, [quantity, cartId, productId]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error("An error occurred while adding the product to the cart");
  }
};

const updateQuantityInCart = async (cartId, productId, quantity) => {
  try {
    await client.query(
      "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3",
      [quantity, cartId, productId]
    );
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const deleteProductFromCart = async (cartId, productId) => {
  try {
    await client.query(
      "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2",
      [cartId, productId]
    );

    const result = await client.query(
      "SELECT COUNT(*) AS cart_count FROM cart_items WHERE cart_id = $1",
      [cartId]
    );
    const cartCount = parseInt(result.rows[0].cart_count);

    if (cartCount === 0) {
      await client.query("DELETE FROM cart WHERE cart_id = $1", [cartId]);
    }
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  getQuantityInCart,
  getCartItems,
  checkCart,
  createCart,
  addToCart,
  updateQuantityInCart,
  deleteProductFromCart,
};
