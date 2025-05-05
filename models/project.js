const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { ar: String, en: String },
  description: { ar: String, en: String },
  address : {
    city: { ar: String, en: String },
    area: { ar: String, en: String },
    government: { ar: String, en: String },
    country : { ar: String, en: String },
    unitPlace : { ar: String, en: String },
  },
  overview : {
    typeOfProject: { ar: String, en: String },
    yearOfEstablishment :Number,
    size : Number ,
    numberOfBathrooms : Number ,
    numberOfRooms :Number ,
    numberOfGarages : Number,
    codeOfUnit : String,
  },
  status: String, // e.g., "completed", "ongoing"
  featured: Boolean,
  prices : {
    minPrice : Number,
    maxPrice : Number,
  },
  media: [String], // Array of image URLs
  type: { ar: String, en: String }, // e.g., "residential", "commercial", "touristic"
  statistics: {
    concrete: Number, // in m³
    steel: Number, // in tons
  },
  servicesOfTheProject: { ar : [String], en: [String]}

});

module.exports = mongoose.model('Project', projectSchema);