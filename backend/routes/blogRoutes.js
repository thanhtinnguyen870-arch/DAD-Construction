const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getBlogs)
  .post(protect, admin, createBlog);

router.route('/:id')
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

router.get('/slug/:slug', getBlogBySlug);

module.exports = router;
