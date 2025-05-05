const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true }
  },
  content: {
    ar: { type: String, required: true },
    en: { type: String, required: true }
  },
  media : [String],
  author: {
    ar: { type: String, required: true },
    en :{ type: String, required: true },
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);