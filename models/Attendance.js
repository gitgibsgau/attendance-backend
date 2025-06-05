const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionId: String,
  timestamp: { type: Date, default: Date.now },
});

// Use existing model if already compiled
module.exports = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
