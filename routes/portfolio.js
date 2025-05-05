const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Portfolio endpoint (featured projects)
router.get('/', async (req, res) => {
    const lang = req.query.lang || 'ar';
    try {
      const portfolio = await Project.find({ featured: true });
      if (!portfolio || portfolio.length === 0) {
        return res.status(404).json({ message: 'portfolio information not found' });
      }

      const response = portfolio.map(project => ({
        id : project._id,
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
        media: project.media,
        type: project.type[lang],
        statistics: project.statistics,
        servicesOfTheProject: project.servicesOfTheProject[lang],
      }));
      res.json(response);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
