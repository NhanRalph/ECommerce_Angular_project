const client = require("../config/database");

const getABC = (req, res) => {
  res.send("Hello World! 123");
};

const getNhanRalph = (req, res) => {
  res.render("sample.ejs");
};

module.exports = {
  getABC,
  getNhanRalph,
};
