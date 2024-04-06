const client = require("../config/database");

const getAllCategories = (req, res) => {
  client.query("SELECT * FROM product_categories", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const categories = result.rows;
    res.status(200).json(categories);
  });
};

module.exports = {
  getAllCategories,
};
