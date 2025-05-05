const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
  title: { ar: String, en: String },
  value: Number,
  unit: String // e.g., "m³", "tons"
});

module.exports = mongoose.model('Statistic', statisticSchema);