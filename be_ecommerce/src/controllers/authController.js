const client = require("../config/database");

const getUser = async (req, res) => {
  try {
    const query = {
      text: "SELECT * FROM users",
    };

    const result = await client.query(query);
    const users = result.rows;
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to find the user by email
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    // Execute the query
    const result = await client.query(query);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Email not found" });
    }

    const user = result.rows[0];

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Authentication successful
    res.status(200).json({ message: "Authentication successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signin,
  getUser,
};
