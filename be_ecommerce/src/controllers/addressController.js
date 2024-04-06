const client = require("../config/database");

// Function to add address for a user
const addAddress = async (req, res) => {
  const { user_id, address, city, country, client_name, client_phone } =
    req.body;

  try {
    // Insert the address into the database
    const query = `
    INSERT INTO address(user_id, address, city, country, client_name, client_phone)
    VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const { rows } = await client.query(query, [
      user_id,
      address,
      city,
      country,
      client_name,
      client_phone,
    ]);

    res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    console.error("Error adding address:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the address" });
  }
};

const getAddress = async (req, res) => {
  const { user_id } = req.query;

  try {
    const query = `
      SELECT 
        u.user_id,
        a.client_name,
        a.client_phone,
        a.address_id,
        a.address,
        a.city,
        a.country
      FROM 
        users u
      JOIN 
        address a ON u.user_id = a.user_id
      WHERE
        u.user_id = $1;
      `;
    const { rows } = await client.query(query, [user_id]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting address:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the address" });
  }
};

module.exports = {
  addAddress,
  getAddress,
};
