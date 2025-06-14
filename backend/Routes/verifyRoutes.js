const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const otpStore = new Map(); // In-memory { key: { otp, expiresAt } }

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

function sendMail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourmail@gmail.com',
      pass: 'your-app-password', // use app password, not real one
    },
  });

  return transporter.sendMail({
    from: 'yourmail@gmail.com',
    to,
    subject,
    text,
  });
}

// Send OTP
router.post('/send-email-otp', async (req, res) => {
  const { email } = req.body;

  const otp = generateOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // valid for 5 min

  try {
    await sendMail(email, 'Your OTP', `Your OTP is ${otp}`);
    otpStore.set(email, { otp, expiresAt });
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Verify OTP & update email
router.post('/verify-email-otp', async (req, res) => {
  const { email, otp, userId } = req.body;

  const record = otpStore.get(email);
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  try {
    await User.findByIdAndUpdate(userId, { email });
    otpStore.delete(email);
    res.json({ success: true, message: 'Email verified & updated' });
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ success: false, message: 'Database update failed' });
  }
});

module.exports = router;
