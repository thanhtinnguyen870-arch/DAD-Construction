const express = require('express');
const router = express.Router();
const { loginUser, getMe, resetAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/reset-admin', resetAdmin);
router.get('/me', protect, getMe);

module.exports = router;
