const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionId: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
