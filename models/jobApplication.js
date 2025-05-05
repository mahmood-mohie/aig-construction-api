const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobListing', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true }, // File path
  coverLetter: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);