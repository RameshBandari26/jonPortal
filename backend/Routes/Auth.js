const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const router = express.Router();

// Test Route
router.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test OK');
});

// Register Route
router.post('/register', async (req, res) => {
  console.log("Register");

  const {
    fullName,
    email,
    password,
    mobileNumber,
    workStatus,
    updatesViaEmail,
    role,
    companyName
  } = req.body;

  console.log("Registering user:", req.body);

  if (!fullName || !email || !password || !mobileNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
      workStatus,
      updatesViaEmail,
      role,
      companyName: role === 'employer' ? companyName : '',
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    // console.log("Received data:", req.body);

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  console.log("Login attempt");

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyName: user.companyName
      }
    });
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout Route (for frontend token removal)
router.post('/logout', (req, res) => {
  return res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
