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
const signup = async (req, res) => {
  const { username, fullname, password, email } = req.body;

  try {
    // Check if the username or email already exists in the database
    const checkUserExits = {
      text: `
        SELECT * FROM users WHERE username = $1 OR email = $2;
      `,
      values: [username, email],
    };

    const checkResult = await client.query(checkUserExits);

    if (checkResult.rows.length > 0) {
      const existingUser = checkResult.rows[0];
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      } else {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // If username and email are unique, proceed with user creation
    const insertQuery = {
      text: `
        INSERT INTO users (username, fullname, password, email)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
      values: [username, fullname, password, email],
    };

    const insertResult = await client.query(insertQuery);
    const newUser = insertResult.rows[0];

    // Authentication successful
    res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signin,
  getUser,
  signup,
};
