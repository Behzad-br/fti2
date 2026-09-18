const express = require('express');
const router = express.Router();
const {
    bookConsultation,
    getAllConsultations,
    getConsultationById,
    updateConsultationStatus,
    deleteConsultation,
} = require('../../controllers/consultation.controller');
const { protect, staff } = require('../../middleware/authMiddleware');
const { formLimiter } = require('../../middleware/rateLimiter');

// ─────────────────────────────────────────────
//  Consultation Routes
//  Base: /api/consultation
// ─────────────────────────────────────────────

// POST /api/consultation          — Public (Book consultation)
router.post('/', formLimiter, bookConsultation);

// GET  /api/consultation          — Private (Admin view all)
router.get('/', protect, staff, getAllConsultations);

// GET  /api/consultation/:id      — Private (Admin view one)
router.get('/:id', protect, staff, getConsultationById);

// PATCH /api/consultation/:id/status — Private (Admin update status)
router.patch('/:id/status', protect, staff, updateConsultationStatus);

// DELETE /api/consultation/:id    — Private (Admin delete)
router.delete('/:id', protect, staff, deleteConsultation);

module.exports = router;
