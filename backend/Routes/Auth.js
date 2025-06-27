const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { sendOtpEmail } = require('../utils/emailService');


const router = express.Router();

const otpResetStore = new Map();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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
    const { email, password, role } = req.body; // ✅ Make sure 'role' is included

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    // ✅ Check role match
    if (user.role !== role) {
      return res.status(403).json({ message: `This account is not registered as a ${role}.` });
    }

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


// ✅ Send OTP to user's email for password reset
router.post('/forgot-password/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOtp();
    const expiresAt = Date.now() + 3 * 60 * 1000; // 3 mins

    await sendOtpEmail(email, otp);
    otpResetStore.set(email, { otp, expiresAt });

    console.log(`🔐 OTP for ${email}: ${otp}`);
    res.json({ success: true, message: 'OTP sent to your email' });

  } catch (err) {
    console.error('Failed to send OTP:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/forgot-password/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  const record = otpResetStore.get(email);
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  return res.json({ success: true, message: 'OTP verified successfully' });
});


// Reset password
router.post('/forgot-password/reset', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const record = otpResetStore.get(email);
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    otpResetStore.delete(email);
    res.json({ success: true, message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
});


module.exports = router;
