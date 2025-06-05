const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');

// Mark Attendance
router.post('/', auth, async (req, res) => {
  const { sessionId } = req.body;
  try {
    const existing = await Attendance.findOne({ user: req.user.id, sessionId });
    if (existing) return res.status(400).json({ message: 'Attendance already marked' });

    const attendance = new Attendance({ user: req.user.id, sessionId });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Attendance History
router.get('/', auth, async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user.id }).populate('user', 'username');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
