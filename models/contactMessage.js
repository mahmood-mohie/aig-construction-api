const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  topic: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);