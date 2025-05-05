const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  address: { ar: String, en: String },
  phone: String,
  email: String,
  mapCoordinates: {
    lat: Number,
    lng: Number
  },
  socialMedia: {
    linkedin: String,
    facebook: String,
    Instagram: String,
    Tiktok: String,
    Youtube: String,
    Twitter: String,
  }
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);