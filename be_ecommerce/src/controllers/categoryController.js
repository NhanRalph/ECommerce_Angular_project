const categoryModel = require("../models/categoryModel");

const getAllCategories = (req, res) => {
  categoryModel
    .getAllCategories()
    .then((result) => {
      const categories = result.rows;
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  getAllCategories,
};
