const express = require('express');
const router = express.Router();
const User = require('../models/User.js'); // Adjust path as needed
const verifyToken = require('../Middleware/Auth'); 

// POST /api/users/userdata
router.post('/userdatas', verifyToken, async (req, res) => {
  try {
    const userId = req.body.userId;  // get userId from body
    console.log('UserId received:', userId);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // send user data
    res.json({
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
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
      location: user.location || '',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Basic details 

router.get('/basic-details', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Retrieved from JWT token
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
//update
router.put('/basic-details',verifyToken, async (req, res) => {
   
  try {
    //console.log('Received request to update basic details');
    const userId = req.user.id; // comes from decoded JWT
   // console.log('User ID from token:', userId);
    const { name, graduation, gender, location } = req.body;
    console.log('Updating user:', userId, 'with name:', name,'graduation:', graduation,'gender',gender,'location',location);

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



router.post('/userdata', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user data
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








// routes/userRoutes.js



// Fetch job seekers
router.get('/candidates', async (req, res) => {
  try {
    const users = await User.find({ role: 'jobSeeker' }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

module.exports = router;


module.exports = router;
module.exports = router;