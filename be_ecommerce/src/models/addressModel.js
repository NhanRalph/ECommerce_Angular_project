const client = require("../config/database");

const addAddress = (
  user_id,
  address,
  city,
  country,
  client_name,
  client_phone
) => {
  return client.query(
    `INSERT INTO address(user_id, address, city, country, client_name, client_phone)
        VALUES ($1, $2, $3, $4, $5, $6)`,
    [user_id, address, city, country, client_name, client_phone]
  );
};

const updateAddress = (
  user_id,
  client_name,
  client_phone,
  address_id,
  address,
  city,
  country
) => {
  const query = `
  UPDATE address
  SET client_name = $2,
      client_phone = $3,
      address = $5,
      city = $6,
      country = $7
  WHERE user_id = $1 AND address_id = $4;
  `;

  return client.query(query, [
    user_id,
    client_name,
    client_phone,
    address_id,
    address,
    city,
    country,
  ]);
};

const getAddress = (user_id) => {
  return client.query(
    `SELECT 
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
            u.user_id = $1`,
    [user_id]
  );
};

module.exports = {
  addAddress,
  getAddress,
  updateAddress,
};
