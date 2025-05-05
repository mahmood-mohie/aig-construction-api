const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  title: { ar: String, en: String },
  description: { ar: String, en: String },
  requirements: { ar: String, en: String },
  location: String,
  postedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobListing', jobListingSchema);