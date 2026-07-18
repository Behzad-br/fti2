const express = require('express');
const router = express.Router();
const { loginUser, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/authMiddleware');

// ─────────────────────────────────────────────
//  Auth Routes — thin, delegates to controller
// ─────────────────────────────────────────────

// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, getMe);

module.exports = router;
