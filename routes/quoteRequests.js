const express = require('express');
const router = express.Router();
const QuoteRequest = require('../models/quoteRequest');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { isValidObjectId } = require('mongoose');

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  next();
};

// GET /api/quote-requests - List all quote requests (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const quoteRequests = await QuoteRequest.find();
    res.json(quoteRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/quote
router.post(
    '/',
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Invalid email'),
      body('serviceType').notEmpty().withMessage('Service type is required'),
      body('message').notEmpty().withMessage('Message is required')
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { name, email, serviceType, message } = req.body;
        const quoteRequest = new QuoteRequest({ name, email, serviceType, message });
        await quoteRequest.save();
        res.status(201).json({ message: 'Quote request submitted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    }
  );

  // DELETE /api/quote-requests/:id - Delete a quote request (admin only)
router.delete('/:id', authMiddleware, validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const quoteRequest = await QuoteRequest.findByIdAndDelete(id);
    if (!quoteRequest) {
      return res.status(404).json({ message: 'Quote request not found' });
    }
    res.json({ message: 'Quote request deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
  module.exports = router;