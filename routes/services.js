const express = require('express');
const router = express.Router();
const Service = require('../models/service');
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

// GET /api/services - List all services (public)
router.get('/', async (req, res) => {
    const lang = req.query.lang || 'ar';
    try {
      const services = await Service.find();
      if (!services || services.length === 0) {
        return res.status(404).json({ message: 'services not found' });
      }
      const response = services.map(service => ({
        id : service._id,
        title: service.title[lang],
        description: service.description[lang],
        icon: service.icon,
        category: service.category[lang],
      }))
      res.json(response);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// POST /api/services - Create a new service (admin only)
router.post(
  '/',
  authMiddleware,
  [
    body('title.ar').notEmpty().withMessage('Arabic title is required'),
    body('title.en').notEmpty().withMessage('English title is required'),
    body('description.ar').notEmpty().withMessage('Arabic description is required'),
    body('description.en').notEmpty().withMessage('English description is required'),
    body('category').notEmpty().withMessage('Category is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, category, images } = req.body;
      const service = new Service({ title, description, category, images});
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /api/services/:id - Update a service (admin only)
router.put(
  '/:id',
  authMiddleware,
  validateObjectId,
  [
    body('title.ar').optional().notEmpty().withMessage('Arabic title cannot be empty'),
    body('title.en').optional().notEmpty().withMessage('English title cannot be empty'),
    body('description.ar').optional().notEmpty().withMessage('Arabic description cannot be empty'),
    body('description.en').optional().notEmpty().withMessage('English description cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const updateData = req.body;
      const service = await Service.findByIdAndUpdate(id, updateData, { new: true });
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/services/:id - Delete a service (admin only)
router.delete('/:id', authMiddleware, validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
