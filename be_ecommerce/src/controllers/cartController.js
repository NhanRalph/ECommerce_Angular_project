const client = require("../config/database");

const getQuantityInCart = (req, res) => {
  client.query("SELECT COUNT(*) FROM cart_items", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const quantity = result.rows[0].count;
    res.status(200).json({ quantity });
  });
};

const getCart = (req, res) => {
  client.query(
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
    cart c ON ci.cart_id = c.cart_id;
  `,
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const cart = result.rows;
      res.status(200).json(cart);
    }
  );
};

const checkCart = async (user_id) => {
  const findCartQuery = `
    SELECT cart_id FROM cart
    WHERE user_id = $1;
  `;
  const { rows } = await client.query(findCartQuery, [user_id]);
  return rows.length ? rows[0].cart_id : null;
};

const createCart = async (user_id) => {
  const createCartQuery = `
    INSERT INTO cart (user_id)
    VALUES ($1)
    RETURNING cart_id;
  `;
  const { rows } = await client.query(createCartQuery, [user_id]);
  return rows[0].cart_id;
};

const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    await client.query("BEGIN");

    let cartId = await checkCart(user_id);
    if (!cartId) {
      cartId = await createCart(user_id);
    }

    const checkProductQuery = `
      SELECT * FROM cart_items
      WHERE cart_id = $1 AND product_id = $2;
    `;
    const { rows } = await client.query(checkProductQuery, [
      cartId,
      product_id,
    ]);

    if (rows.length === 0) {
      // Product doesn't exist in the cart, insert a new record
      const addProductToCartQuery = `
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES ($1, $2, $3);
      `;
      await client.query(addProductToCartQuery, [cartId, product_id, quantity]);
    } else {
      const quantityInStockQuery = `
        SELECT quantity FROM products
        WHERE product_id = $1;
      `;
      const quantityInStockResult = await client.query(quantityInStockQuery, [
        product_id,
      ]);
      const quantityInStock = quantityInStockResult.rows[0].quantity;

      const quantityCurrentlyInCartQuery = `
        SELECT quantity FROM cart_items
        WHERE cart_id = $1 AND product_id = $2;
      `;
      const quantityCurrentlyInCartResult = await client.query(
        quantityCurrentlyInCartQuery,
        [cartId, product_id]
      );
      const quantityCurrentlyInCart =
        quantityCurrentlyInCartResult.rows.length > 0
          ? quantityCurrentlyInCartResult.rows[0].quantity
          : 0;

      const quantityRemind = quantityInStock - quantityCurrentlyInCart;

      if (quantity > quantityRemind) {
        return res.status(400).json({
          quantityInStockResult: quantityInStock,
          quantityCurrentlyInCartResult: quantityCurrentlyInCart,
          error: "Quantity exceeds available stock",
        });
      }

      // Update the quantity of the existing product in the cart
      const updateProductQuery = `
        UPDATE cart_items
        SET quantity = quantity + $1
        WHERE cart_id = $2 AND product_id = $3;
      `;
      await client.query(updateProductQuery, [quantity, cartId, product_id]);
    }

    await client.query("COMMIT");
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding product to cart:", error);
    res.status(500).json({
      error: "An error occurred while adding the product to the cart",
    });
  }
};

const updateQuantity = async (req, res) => {
  const { cart_id, product_id, quantity } = req.body;
  try {
    await client.query(
      `
      UPDATE cart_items
      SET quantity = $3
      WHERE cart_id = $1 AND product_id = $2;
      `,
      [cart_id, product_id, quantity]
    );

    // Send a success response
    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProductFromCart = async (req, res) => {
  const { cart_id, product_id } = req.params;

  try {
    // Delete the product from the cart
    await client.query(
      `
      DELETE FROM cart_items
      WHERE cart_id = $1 AND product_id = $2
      `,
      [cart_id, product_id]
    );

    // Check if cart count becomes zero
    const result = await client.query(
      `
      SELECT COUNT(*) AS cart_count
      FROM cart_items
      WHERE cart_id = $1
      `,
      [cart_id]
    );

    const cartCount = parseInt(result.rows[0].cart_count);

    // If cart count is zero, delete the cart
    if (cartCount === 0) {
      await client.query(
        `
        DELETE FROM cart
        WHERE cart_id = $1
        `,
        [cart_id]
      );
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getQuantityInCart,
  addToCart,
  getCart,
  updateQuantity,
  deleteProductFromCart,
};
