const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionId: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Attendance || mongoose.model('Attendance', schema);
