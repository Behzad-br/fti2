const express = require('express');
const router = express.Router();
const {
    bookConsultation,
    getAllConsultations,
    getConsultationById,
    updateConsultationStatus,
    deleteConsultation,
} = require('../../controllers/consultation.controller');
const { protect } = require('../../middleware/authMiddleware');

// ─────────────────────────────────────────────
//  Consultation Routes
//  Base: /api/consultation
// ─────────────────────────────────────────────

// POST /api/consultation          — Public (Book consultation)
router.post('/', bookConsultation);

// GET  /api/consultation          — Private (Admin view all)
router.get('/', protect, getAllConsultations);

// GET  /api/consultation/:id      — Private (Admin view one)
router.get('/:id', protect, getConsultationById);

// PATCH /api/consultation/:id/status — Private (Admin update status)
router.patch('/:id/status', protect, updateConsultationStatus);

// DELETE /api/consultation/:id    — Private (Admin delete)
router.delete('/:id', protect, deleteConsultation);

module.exports = router;
