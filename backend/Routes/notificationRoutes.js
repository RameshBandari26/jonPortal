const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Notification = require('../models/Notification');
const io = global.io;

// ✅ GET all notifications for a user
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST create a new notification — userId from token
router.post('/', verifyToken, async (req, res) => {
  const userId = req.user.id; // ✅ pulled from token
  const { type, title, message } = req.body;

  if (!type || !title || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newNotification = new Notification({ userId, type, title, message });
    await newNotification.save();

    // ✅ Emit notification to specific user via Socket.IO
    io.to(userId).emit('new_notification', newNotification);

    res.status(201).json(newNotification);
  } catch (err) {
    console.error('Create notification error:', err);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// ✅ PUT mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// ✅ DELETE a notification
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
