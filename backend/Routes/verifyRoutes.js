// ✅ Routes/verifyRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const verifyToken = require('../Middleware/Auth');
const verifyToken = require('../middleware/auth');
const { sendOtpEmail } = require('../utils/resendService'); // ✅ Use Resend

const otpStore = new Map(); // email -> { otp, expiresAt }

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ✅ Send OTP to email
router.post('/send-email-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  const expiresAt = Date.now() + 3 * 60 * 1000;

  try {
    await sendOtpEmail(email, otp);
    otpStore.set(email, { otp, expiresAt });
    res.json({ success: true, message: 'OTP sent to email' });
    console.log(`Generated OTP for ${email}: ${otp}`);
  } catch (err) {
    console.error('Failed to send OTP:', err);
    res.status(500).json({ success: false, message: 'Could not send OTP' });
  }
});

// ✅ Verify OTP and update user email
router.post('/verify-email-otp', verifyToken, async (req, res) => {
  const { email, otp } = req.body;
  const userId = req.user.id; // ✅ From token

  const record = otpStore.get(email);
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  try {
    await User.findByIdAndUpdate(userId, {
      email,
      emailVerified: true,
    });
    otpStore.delete(email);
    res.json({ success: true, message: 'Email verified & updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
module.exports = router;
