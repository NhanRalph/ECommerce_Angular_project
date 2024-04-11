const addressModel = require("../models/addressModel.js");

// Function to add address for a user
const updateAddress = async (req, res) => {
  const {
    user_id,
    client_name,
    client_phone,
    address_id,
    address,
    city,
    country,
  } = req.body;
  addressModel
    .updateAddress(
      user_id,
      client_name,
      client_phone,
      address_id,
      address,
      city,
      country
    )
    .then((result) => {
      res.status(200).json({ message: "Address update successfully" });
    })
    .catch((error) => {
      console.error("Error updating address:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the address" });
    });
};

const addAddress = async (req, res) => {
  const { user_id, address, city, country, client_name, client_phone } =
    req.body;
  addressModel
    .addAddress(user_id, address, city, country, client_name, client_phone)
    .then((result) => {
      res.status(200).json({ message: "Address added successfully" });
    })
    .catch((error) => {
      console.error("Error adding address:", error);
      res
        .status(500)
        .json({ error: "An error occurred while adding the address" });
    });
};

const getAddress = async (req, res) => {
  const { user_id } = req.query;

  addressModel
    .getAddress(user_id)
    .then((result) => {
      const address = result.rows;
      res.status(200).json(address);
    })
    .catch((error) => {
      console.error("Error getting address:", error);
      res
        .status(500)
        .json({ error: "An error occurred while getting the address" });
    });
};

module.exports = {
  addAddress,
  getAddress,
  updateAddress,
};
