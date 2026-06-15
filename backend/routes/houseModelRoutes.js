const express = require('express');
const router = express.Router();
const { getHouseModels, getHouseModelBySlug, createHouseModel, updateHouseModel, deleteHouseModel } = require('../controllers/houseModelController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHouseModels)
  .post(protect, admin, createHouseModel);

router.route('/:id')
  .put(protect, admin, updateHouseModel)
  .delete(protect, admin, deleteHouseModel);

router.get('/slug/:slug', getHouseModelBySlug);

module.exports = router;
