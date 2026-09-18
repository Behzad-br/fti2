const express = require('express');
const router = express.Router();
const {
    submitStudyAbroadApplication,
    submitIELTSApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication,
} = require('../../controllers/application.controller');
const { protect, staff } = require('../../middleware/authMiddleware');
const { formLimiter } = require('../../middleware/rateLimiter');

// ─────────────────────────────────────────────
//  Application Routes
//  Base: /api/apply
// ─────────────────────────────────────────────

// POST /api/apply          — Public (Study Abroad form)
router.post('/', formLimiter, submitStudyAbroadApplication);

// POST /api/apply/ielts    — Public (IELTS form)
router.post('/ielts', formLimiter, submitIELTSApplication);

// GET  /api/apply          — Private (Admin view all)
router.get('/', protect, staff, getAllApplications);

// GET  /api/apply/:id      — Private (Admin view one)
router.get('/:id', protect, staff, getApplicationById);

// PATCH /api/apply/:id/status — Private (Admin update status)
router.patch('/:id/status', protect, staff, updateApplicationStatus);

// DELETE /api/apply/:id    — Private (Admin delete)
router.delete('/:id', protect, staff, deleteApplication);

module.exports = router;
