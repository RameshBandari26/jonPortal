const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');

const emailOTPs = {};
const phoneOTPs = {};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Nodemailer transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // your email
    pass: process.env.EMAIL_PASS        // your app password
  },
});

// 📧 Send Email OTP
router.post('/send-email-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const otp = generateOTP();
  emailOTPs[email] = otp;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your One Time Password is: ${otp}`
    });

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP email' });
  }
});

// ✅ Verify Email OTP
router.post('/verify-email-otp', (req, res) => {
  const { email, otp } = req.body;
  if (emailOTPs[email] === otp) {
    delete emailOTPs[email];
    return res.json({ success: true });
  }
  return res.status(400).json({ success: false, message: 'Invalid OTP' });
});

// 📱 Send Phone OTP
router.post('/send-phone-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: 'Phone is required' });

  const otp = generateOTP();
  phoneOTPs[phone] = otp;

  try {
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      variables_values: otp,
      route: 'otp',
      numbers: phone,
    }, {
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (response.data.return) {
      res.json({ success: true, message: 'OTP sent to phone' });
    } else {
      res.status(500).json({ success: false, message: 'SMS failed' });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'SMS service error' });
  }
});

// ✅ Verify Phone OTP
router.post('/verify-phone-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (phoneOTPs[phone] === otp) {
    delete phoneOTPs[phone];
    return res.json({ success: true });
  }
  return res.status(400).json({ success: false, message: 'Invalid OTP' });
});

module.exports = router;
