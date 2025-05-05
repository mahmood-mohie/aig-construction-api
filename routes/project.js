const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  next();
};

// Projects endpoint
router.get('/', async (req, res) => {
  const lang = req.query.lang || 'ar';
  try {
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'Projects not found' });
    }
    const response = projects.map((project) => ({
      id: project._id,
      title: project.title[lang],
      description: project.description[lang],
      address: {
        city: project.address.city[lang],
        area: project.address.area[lang],
        government: project.address.government[lang],
        country: project.address.country[lang],
        unitPlace: project.address.unitPlace[lang],
      },
      overview: {
        typeOfProject: project.overview.typeOfProject[lang],
        yearOfEstablishment: project.overview.yearOfEstablishment,
        size: project.overview.size,
        numberOfBathrooms: project.overview.numberOfBathrooms,
        numberOfRooms: project.overview.numberOfRooms,
        numberOfGarages: project.overview.numberOfGarages,
        codeOfUnit: project.overview.codeOfUnit,
      },
      status: project.status,
      featured: project.featured,
      prices : {
        minPrice : project.prices.minPrice,
        maxPrice : project.prices.maxPrice,
      },
      media: project.media,
      type: project.type[lang],
      statistics: {
        concrete : project.statistics.concrete,
        steel : project.statistics.steel,
      },
      servicesOfTheProject: project.servicesOfTheProject[lang],
    }));
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  const lang = req.query.lang || 'ar';
  try {
    const project = await Project.findById(req.params.id);
    if (!project || project.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const response = {
      id: project._id,
      title: project.title[lang],
      description: project.description[lang],
      address: {
        city: project.address.city[lang],
        area: project.address.area[lang],
        government: project.address.government[lang],
        country: project.address.country[lang],
        unitPlace: project.address.unitPlace[lang],
      },
      overview: {
        typeOfProject: project.overview.typeOfProject[lang],
        yearOfEstablishment: project.overview.yearOfEstablishment,
        size: project.overview.size,
        numberOfBathrooms: project.overview.numberOfBathrooms,
        numberOfRooms: project.overview.numberOfRooms,
        numberOfGarages: project.overview.numberOfGarages,
        codeOfUnit: project.overview.codeOfUnit,
      },
      status: project.status,
      featured: project.featured,
      prices : {
        minPrice : project.prices.minPrice,
        maxPrice : project.prices.maxPrice,
      },
      media: project.media,
      type: project.type[lang],
      statistics: {
        concrete : project.statistics.concrete,
        steel : project.statistics.steel,
      },
      servicesOfTheProject: project.servicesOfTheProject[lang],
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// POST /api/projects - Create a new projects (admin only)
router.post(
  '/',
  authMiddleware,
  [
    body('title.ar').notEmpty().withMessage('Arabic title is required'),
    body('title.en').notEmpty().withMessage('English title is required'),
    body('description.ar')
      .notEmpty()
      .withMessage('Arabic description is required'),
    body('description.en')
      .notEmpty()
      .withMessage('English description is required'),
    body('servicesOfTheProject.ar')
      .notEmpty()
      .withMessage('Arabic Services of the project is required'),
    body('servicesOfTheProject.en')
      .notEmpty()
      .withMessage('English Services of the project is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        title,
        description,
        address,
        overview,
        statistics,
        servicesOfTheProject,
        status,
        featured,
        media,
        type,
        prices,
      } = req.body;
      const project = new Project({
        title,
        description,
        address,
        overview,
        statistics,
        servicesOfTheProject,
        status,
        featured,
        media,
        type,
        prices,
      });
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /api/projects/:id - Update a projects (admin only)
router.put(
  '/:id',
  authMiddleware,
  validateObjectId,
  [
    body('title.ar')
      .optional()
      .notEmpty()
      .withMessage('Arabic title is required'),
    body('title.en')
      .optional()
      .notEmpty()
      .withMessage('English title is required'),
    body('description.ar')
      .optional()
      .notEmpty()
      .withMessage('Arabic description is required'),
    body('description.en')
      .optional()
      .notEmpty()
      .withMessage('English description is required'),
    body('servicesOfTheProject.ar')
      .optional()
      .notEmpty()
      .withMessage('Arabic Services of the project is required'),
    body('servicesOfTheProject.en')
      .optional()
      .notEmpty()
      .withMessage('English Services of the project is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const updateData = req.body;
      const project = await Project.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!project) {
        return res.status(404).json({ message: 'projects not found' });
      }
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/projects/:id - Delete a project (admin only)
router.delete('/:id', authMiddleware, validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'projects not found' });
    }
    res.json({ message: 'projects deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
