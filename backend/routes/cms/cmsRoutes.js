const express = require('express');
const router = express.Router();
const { getCMSData, updateCMSData } = require('../../controllers/cms.controller');
const { protect } = require('../../middleware/authMiddleware');

// ─────────────────────────────────────────────
//  CMS Routes
//  Base: /api/cms
// ─────────────────────────────────────────────

// GET  /api/cms         — Public (all pages load CMS data)
router.get('/', getCMSData);

// POST /api/cms/update  — Private admin/employee (CMS editor)
router.post('/update', protect, updateCMSData);

module.exports = router;
