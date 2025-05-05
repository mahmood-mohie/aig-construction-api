const express = require('express');
const router = express.Router();
const JobListing = require('../models/jobListing');
const JobApplication = require('../models/jobApplication');
const multer = require('multer');
const { body, validationResult } = require('express-validator');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage });

// GET /api/careers - List job openings
router.get('/', async (req, res) => {
    const lang = req.query.lang || 'ar';
    try {
      const jobListings = await JobListing.find().sort({ postedDate: -1 });
      if (!jobListings || jobListings.length === 0) {
        return res.status(404).json({ message: 'jobListings information not found' });
      }

      const response = jobListings.map(job => ({
        id : job._id,
        title : job.title[lang],
        description : job.description[lang],
        requirements : job.requirements[lang],
        location : job.location,
        postedDate : job.postedDate,
      }));
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/careers/apply - Submit job application
router.post(
    '/apply',
    upload.single('resume'),
    [
      body('jobId').notEmpty().withMessage('Job ID is required'),
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Invalid email'),
      body('coverLetter').optional()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { jobId, name, email, coverLetter } = req.body;
        const resume = req.file.path;
        const jobApplication = new JobApplication({ jobId, name, email, resume, coverLetter });
        await jobApplication.save();
        res.status(201).json({ message: 'Job application submitted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    }
  );
  
  module.exports = router;