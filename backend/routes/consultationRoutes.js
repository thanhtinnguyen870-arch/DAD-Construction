const express = require('express');
const router = express.Router();
const { getConsultations, createConsultation, updateConsultationStatus, deleteConsultation } = require('../controllers/consultationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, admin, getConsultations)
  .post(createConsultation); // Public can create

router.route('/:id/status')
  .put(protect, admin, updateConsultationStatus);

router.route('/:id')
  .delete(protect, admin, deleteConsultation);

module.exports = router;
