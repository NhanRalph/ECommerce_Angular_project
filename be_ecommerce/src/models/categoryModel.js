const client = require("../config/database");

const getAllCategories = () => {
  return client.query("SELECT * FROM product_categories");
};

module.exports = {
  getAllCategories,
};
