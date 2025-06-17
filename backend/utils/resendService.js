// utils/resendService.js

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY); // keep in .env

async function sendOtpEmail(to, otp) {
  return resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Your Email Verification OTP',
    html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 3 minutes.</p>`,
  });
}

module.exports = { sendOtpEmail };
