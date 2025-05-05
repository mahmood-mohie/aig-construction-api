const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/contactInfo');

// Company Contact Info endpoint
router.get('/', async (req, res) => {
    const lang = req.query.lang || 'ar';
    try {
      const companyContact = await ContactInfo.find();
      if (!companyContact || companyContact.length === 0) {
        return res.status(404).json({ message: 'Company Contact information not found' });
      }
      const response = companyContact.map( info => ({
        id : info._id,
        address: info.address[lang],
        phone: info.phone,
        email: info.email,
        mapCoordinates: info.mapCoordinates,
        socialMedia: info.socialMedia,
      }))
      res.json(response);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
