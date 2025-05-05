const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');

// Company endpoint
router.get('/', async (req, res) => {
    const lang = req.query.lang || 'ar';
    try {
      const company = await Company.findOne();
      if (!company) {
        return res.status(404).json({ message: 'Company information not found' });
      }
      const response = {
        id : company._id,
        companyLogos : company.logo,
        name: company.name[lang],
        slogan: company.slogan[lang],
        mainFeature: company.mainFeature[lang],
        about: company.about[lang],
        vision: {
          ourValues : {
            icon : company.vision.ourValues.icon,
            title : company.vision.ourValues.title[lang],
            description : company.vision.ourValues.description[lang],
          },
          ourMessage : {
            icon : company.vision.ourMessage.icon,
            title : company.vision.ourMessage.title[lang],
            description : company.vision.ourMessage.description[lang],
          }
        },
        team: company.team.map((employee) => ({
          id: employee._id,
          employeeName: employee.employeeName[lang],
          employeePosition: employee.employeePosition[lang],
          photo: employee.photo,
        })),
        whyChooseUs: company.whyChooseUs.map((card) => ({
          id: card._id,
          icon: card.icon,
          title: card.title[lang],
          description: card.description[lang],
        })),
        ourPartners: company.ourPartners.map((partner) => ({
          id: partner._id,
          url: partner.url,
          name: partner.name[lang],
          logo: partner.logo,
        })),
        whyWeAreDifferent: {
          paragraph : company.whyWeAreDifferent.paragraph[lang],
          features : company.whyWeAreDifferent.features.map((card) => ({
            id: card._id,
            icon: card.icon,
            title: card.title[lang],
            description: card.description[lang],
          }))
        },
        established: company.established,
        history: company.history.map((e) => ({
          id: e._id,
          year: e.year,
          achievements: e.achievements[lang],
        })),
        socialMedia: company.socialMedia,
      }
      res.json(response);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.post(
  '/',
  authMiddleware, // Ensures only authorized admins can access
  [
    body('name.ar').notEmpty().withMessage('Arabic name is required'),
    body('name.en').notEmpty().withMessage('English name is required'),
    body('about.ar').notEmpty().withMessage('Arabic about is required'),
    body('about.en').notEmpty().withMessage('English about is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, about } = req.body;
      const company = new Company({ name, about });
      await company.save();
      res.status(201).json(company);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.put(
  '/',
  authMiddleware,
  [
    body('socialMedia.facebook.url').optional().isURL().withMessage('Invalid Facebook URL'),
    body('socialMedia.twitter.url').optional().isURL().withMessage('Invalid Twitter URL'),
    body('socialMedia.instagram.url').optional().isURL().withMessage('Invalid Instagram URL'),
    body('socialMedia.tiktok.url').optional().isURL().withMessage('Invalid tiktok URL'),
    body('socialMedia.linkedin.url').optional().isURL().withMessage('Invalid LinkedIn URL'),
    body('socialMedia.youtube.url').optional().isURL().withMessage('Invalid youtube URL'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updateData = req.body;
      const company = await Company.findOneAndUpdate({}, updateData, { new: true });
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.json(company);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);
module.exports = router;
  