require("dotenv").config();

const express = require("express");

const configViewEngine = require("./config/viewEngine");

const webRoutes = require("./routes/web");

const app = express();
const port = process.env.PORT || 8888;

const cors = require("cors");
const bodyParser = require("body-parser");

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON-encoded bodies
app.use(bodyParser.json());

//config view engine
configViewEngine(app);

//khai bao routes
app.use("/", webRoutes);

app.listen(port, () => {
  console.log(`-----------------------------------`);
  console.log(`Example app listening on port ${port}`);
  console.log(`-----------------------------------`);
});
