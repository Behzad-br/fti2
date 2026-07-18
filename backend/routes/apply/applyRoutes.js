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
const { protect } = require('../../middleware/authMiddleware');

// ─────────────────────────────────────────────
//  Application Routes
//  Base: /api/apply
// ─────────────────────────────────────────────

// POST /api/apply          — Public (Study Abroad form)
router.post('/', submitStudyAbroadApplication);

// POST /api/apply/ielts    — Public (IELTS form)
router.post('/ielts', submitIELTSApplication);

// GET  /api/apply          — Private (Admin view all)
router.get('/', protect, getAllApplications);

// GET  /api/apply/:id      — Private (Admin view one)
router.get('/:id', protect, getApplicationById);

// PATCH /api/apply/:id/status — Private (Admin update status)
router.patch('/:id/status', protect, updateApplicationStatus);

// DELETE /api/apply/:id    — Private (Admin delete)
router.delete('/:id', protect, deleteApplication);

module.exports = router;
