const express = require('express');
const router = express.Router();
const Statistic = require('../models/statistic');

// Statistic endpoint
router.get('/', async (req, res) => {
    const lang = req.query.lang || 'ar';
    try {
      const statistic = await Statistic.find();
      if (!statistic || statistic.length === 0) {
        return res.status(404).json({ message: 'statistic not found' });
      }
      const response = statistic.map(e => ({
        id : e._id,
        title: e.title[lang],
        value: e.value,
        unit: e.unit,
      }));
      res.json(response);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;