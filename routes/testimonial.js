const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonial');

// Testimonial endpoint
router.get('/', async (req, res) => {
    const lang = req.query.lang || 'ar';
    try {
      const testimonial = await Testimonial.find();
      if (!testimonial  || testimonial.length === 0) {
        return res.status(404).json({ message: 'testimonial not found' });
      }
      const response = testimonial.map(e => ({
        id : e._id,
        name: e.name[lang],
        quote: e.quote[lang],
        company: e.company[lang],
        image: e.image,
      }));
      res.json(response);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;