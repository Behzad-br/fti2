const express = require('express');
const router = express.Router();
const { loginUser, getMe } = require('../../controllers/auth.controller');
const { protect } = require('../../middleware/authMiddleware');

// ─────────────────────────────────────────────
//  Auth Routes
//  Base: /api/auth
// ─────────────────────────────────────────────

// POST /api/auth/login   — Public
router.post('/login', loginUser);

// GET  /api/auth/me      — Private
router.get('/me', protect, getMe);

module.exports = router;
