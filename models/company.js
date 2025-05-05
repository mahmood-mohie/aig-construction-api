const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { ar: String, en: String },
  companyLogos: [String],
  slogan: {
    ar : String,
    en : String
  },
  mainFeature : {
    ar : String,
    en : String
  },
  about: { ar: String, en: String },
  vision: { 
    ourValues : {
      icon : String,
      title : { ar: String, en: String },
      description: { ar: String, en: String } 
    },
    ourMessage : {
      icon : String,
      title : { ar: String, en: String },
      description: { ar: String, en: String } 
    }
   },
  team: [
    {
      employeeName: { ar: String, en: String },
      employeePosition : { ar: String, en: String },
      photo : {type: String},
    },
  ],
  whyChooseUs: [
    {
      icon : String,
      title : { ar: String, en: String },
      description : { ar: String, en: String },
    },
  ],
  ourPartners :[
    {
    url: { type: String },
    logo: { type: String },
    name : { ar: String, en: String },
    },
  ],
  whyWeAreDifferent : {
    paragraph :  { ar: String, en: String },
    features : [
      {
        icon : String,
        title : { ar: String, en: String },
        description : { ar: String, en: String },
      },
    ]
  },
  established: Number,
  history: [
    {
      year : Number,
      achievements : { ar: String, en: String },
    },
  ],
  socialMedia: {
    linkedin: {
      url: { type: String },
      logo: { type: String }
    },
    facebook: {
      url: { type: String },
      logo: { type: String }
    },
    tiktok: {
      url: { type: String },
      logo: { type: String }
    },
    twitter: {
      url: { type: String },
      logo: { type: String }
    },
    instagram: {
      url: { type: String },
      logo: { type: String }
    },
    youtube: {
      url: { type: String },
      logo: { type: String }
    }
  }
});

module.exports = mongoose.model('Company', companySchema);