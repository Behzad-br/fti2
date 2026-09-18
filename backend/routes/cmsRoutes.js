const express = require('express');
const router = express.Router();
const { getCMSData, updateCMSData } = require('../controllers/cms.controller');
const { protect, staff } = require('../middleware/authMiddleware');

// ─────────────────────────────────────────────
//  CMS Routes — thin, delegates to controller
// ─────────────────────────────────────────────

// @route   GET /api/cms
// @access  Public
router.get('/', getCMSData);

// @route   POST /api/cms/update
// @access  Private (admin/employee)
router.post('/update', protect, staff, updateCMSData);

module.exports = router;
