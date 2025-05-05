const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { ar: String, en: String },
  quote: { ar: String, en: String },
  company: { ar: String, en: String },
  image: String
});

module.exports = mongoose.model('Testimonial', testimonialSchema);