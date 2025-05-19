const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchuser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "AnujMendhesApp";

const router = express.Router();

// ROUTE 1: Create a user
router.post('/createuser', [
  body('email', 'Enter a valid email.').isEmail(),
  body('name', 'Name must be at least 3 characters.').isLength({ min: 3 }),
  body('password', 'Password must be at least 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: 'User with this email already exists.' });

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });

    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Authenticate user login
router.post('/login', [
  body('email', 'Enter a valid email.').isEmail(),
  body('password', 'Password is required.').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password." });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) return res.status(400).json({ error: "Invalid email or password." });

    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


router.post('/getuser', fetchUser, async (req, res) => {
  try {
    // Get user ID from request (set by middleware)
    const userId = req.user.id;

    // Fetch user from DB, excluding password
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;




