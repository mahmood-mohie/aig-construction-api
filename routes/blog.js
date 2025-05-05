const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth'); // Created in Step 6
const { isValidObjectId } = require('mongoose');

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  next();
};

// GET /api/blog - List all blog posts
router.get('/', async (req, res) => {
  const lang = req.query.lang || 'ar';
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
    if (!blogPosts || blogPosts.length === 0) {
      return res
        .status(404)
        .json({ message: 'blogPosts information not found' });
    }

    // Map over the array of blog posts and construct the response for each post
    const response = blogPosts.map((post) => ({
      id: post._id,
      title: post.title[lang],
      content: post.content[lang],
      media: post.media,
      author: post.author[lang],
      tags: post.tags,
      createdAt: post.createdAt,
      createdAt: post.createdAt,
    }));
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  const lang = req.query.lang || 'ar';
  try {
    const blogPosts = await BlogPost.findById(req.params.id);
    if (!blogPosts || blogPosts.length === 0) {
      return res.status(404).json({ message: 'blogPosts not found' });
    }
    const response = {
      id: blogPosts._id,
      title: blogPosts.title[lang],
      content: blogPosts.content[lang],
      media: blogPosts.media,
      author: blogPosts.author[lang],
      tags: blogPosts.tags,
      createdAt: blogPosts.createdAt,
      createdAt: blogPosts.createdAt,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// POST /api/blog - Create a blog post (protected)
router.post(
  '/',
  authMiddleware,
  [
    body('title.ar').notEmpty().withMessage('Arabic title is required'),
    body('title.en').notEmpty().withMessage('English title is required'),
    body('content.ar').notEmpty().withMessage('Arabic content is required'),
    body('content.en').notEmpty().withMessage('English content is required'),
    body('author').optional().notEmpty().withMessage('Author is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, author, tags } = req.body;
      const blogPost = new BlogPost({ title, content, author, tags });
      await blogPost.save();
      res.status(201).json(blogPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /api/blog/:id - Update a service (admin only)
router.put(
  '/:id',
  authMiddleware,
  validateObjectId,
  [
    body('title.ar')
      .optional()
      .notEmpty()
      .withMessage('Arabic title cannot be empty'),
    body('title.en')
      .optional()
      .notEmpty()
      .withMessage('English title cannot be empty'),
    body('content.ar')
      .optional()
      .notEmpty()
      .withMessage('Arabic content cannot be empty'),
    body('content.en')
      .optional()
      .notEmpty()
      .withMessage('English content cannot be empty'),
    body('author').optional().notEmpty().withMessage('Author cannot be empty'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const updateData = req.body;
      const blogPost = await BlogPost.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!blogPost) {
        return res.status(404).json({ message: 'blogPost not found' });
      }
      res.json(blogPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/blog/:id - Delete a service (admin only)
router.delete('/:id', authMiddleware, validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findByIdAndDelete(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'blogPost not found' });
    }
    res.json({ message: 'blogPost deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
