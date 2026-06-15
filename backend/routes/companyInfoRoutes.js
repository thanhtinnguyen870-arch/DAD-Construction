const express = require('express');
const router = express.Router();
const { getCompanyInfo, updateCompanyInfo } = require('../controllers/companyInfoController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCompanyInfo)
  .put(protect, admin, updateCompanyInfo);

module.exports = router;
