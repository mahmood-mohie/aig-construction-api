const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { ar: String, en: String },
  description: { ar: String, en: String },
  icon : [String],
  category: { ar: String, en: String }, // e.g., "construction", "metal works", "infrastructure"
});

module.exports = mongoose.model('Service', serviceSchema);