const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');

// ✅ POST /api/attendance - Mark attendance for current user
router.post('/', auth, async (req, res) => {
  const { sessionId } = req.body;
  try {
    const existing = await Attendance.findOne({ user: req.user.id, sessionId });
    if (existing) return res.status(400).json({ message: 'Attendance already marked' });

    const attendance = new Attendance({ user: req.user.id, sessionId });
    await attendance.save();

    res.status(201).json({ message: 'Attendance marked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/attendance - Get attendance history for current user
router.get('/', auth, async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user.id }).populate('user', 'email');
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Optional: Admin can view all users' attendance
router.get('/all', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const records = await Attendance.find().populate('user', 'email role');
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
