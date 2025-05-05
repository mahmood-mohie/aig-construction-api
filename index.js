const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});
app.use(limiter);

// Import Routes
const quoteRoutes = require('./routes/quoteRequests');
const blogRoutes = require('./routes/blog');
const careersRoutes = require('./routes/careers');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const homeRoutes = require('./routes/home');
const servicesRoutes = require('./routes/services');
const projectRoutes = require('./routes/project');
const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');
const companyContactInfoRoutes = require('./routes/companyContactInfo');
const testimonialRoutes = require('./routes/testimonial');
const statisticRoutes = require('./routes/statistic');

// Routes of the application
app.use('/api/quote', quoteRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/', homeRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/companyContactInfo', companyContactInfoRoutes);
app.use('/api/testimonial', testimonialRoutes);
app.use('/api/statistic', statisticRoutes);

// Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});