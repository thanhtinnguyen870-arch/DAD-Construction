const express = require('express');
const router = express.Router();
const { getProjects, getFeaturedProjects, getProjectBySlug, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProjects)
  .post(protect, admin, createProject);

router.get('/featured', getFeaturedProjects);

router.route('/:id')
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

router.get('/slug/:slug', getProjectBySlug);

module.exports = router;
