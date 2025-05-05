const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/contactMessage');
const authMiddleware = require('../middleware/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact endpoint
router.get('/', authMiddleware, async (req, res) => {
    try {
      const contact = await ContactMessage.findOne();
      if (!contact) {
        return res.status(404).json({ message: 'Contact information not found' });
      }
      res.json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
    const { fullName, email, topic, message } = req.body;

    // Basic validation
    if (!fullName || !email || !topic || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Save to database
    const contact = new ContactMessage({ fullName, email, topic, message });
    await contact.save();

    // Send email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'mahmoudcoder001@gmail.com', // NOTE: Replace with your company email
        subject: `New Contact Form Submission: ${topic}`,
        text: `From: ${fullName} <${email}>\n\n${message}`
    };

    await transporter.sendMail(mailOptions); // Use await for better error handling
    res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

module.exports = router;

    