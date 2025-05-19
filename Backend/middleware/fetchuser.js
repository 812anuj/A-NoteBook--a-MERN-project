const jwt = require('jsonwebtoken');
const JWT_SECRET = "AnujMendhesApp";

const fetchUser = (req, res, next) => {
  // Get token from header
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next(); // Proceed to next middleware or route
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = fetchUser;
