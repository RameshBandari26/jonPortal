// utils/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Change if using other email services like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Email Verification OTP',
    html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 3 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail };
