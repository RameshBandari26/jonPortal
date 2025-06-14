const express = require('express');
const router = express.Router();
const User = require('../models/User.js'); // Adjust path if needed
const verifyToken = require('../Middleware/Auth'); 

// ✅ POST /api/users/userdata — fetch user info securely
router.post('/userdata', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // 🔄 Updated: using user ID from JWT instead of body
    console.log('UserId received:', userId);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      fullName: user.fullName,
      email: user.email,
      emailVerified: user.emailVerified,           // ✅ added
      mobileNumber: user.mobileNumber,
      mobileVerified: user.mobileVerified,         // ✅ added
      workStatus: user.workStatus,
      updatesViaEmail: user.updatesViaEmail,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      experiences: user.experiences || '',
      location: user.location || '',
      ctc: user.ctc || '',
      graduation: user.graduation || '',
      gender: user.gender || '',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🧹 Removed duplicate POST /userdata (without verifyToken)
// router.post('/userdata', async (req, res) => { ... });


// ✅ GET /basic-details — fetch specific user fields
router.get('/basic-details', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('fullName graduation gender location');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Error retrieving user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT /basic-details — update specific fields
router.put('/basic-details', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, graduation, gender, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName: name,
        graduation,
        gender,
        location,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Basic details updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Error updating user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ PUT /update — general user update (admin or profile edit)
router.put('/update', async (req, res) => {
  const { userId, ...updateData } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET /contact-verification — used for showing email/mobile verification in frontend
router.get('/contact-verification', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('email mobileNumber emailVerified mobileVerified'); // 🔄 fixed `phoneVerified`

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      email: user.email,
      mobileNumber: user.mobileNumber,
      emailVerified: user.emailVerified,
      mobileVerified: user.mobileVerified,
    });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ GET /candidates — fetch job seekers
router.get('/candidates', async (req, res) => {
  try {
    const users = await User.find({ role: 'jobSeeker' }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

module.exports = router;
