const express = require('express');
const router = express.Router();
const {
    submitContact,
    getAllContacts,
    getContactById,
    markContactRead,
    deleteContact,
} = require('../../controllers/contact.controller');
const { protect } = require('../../middleware/authMiddleware');

// ─────────────────────────────────────────────
//  Contact Routes
//  Base: /api/contact
// ─────────────────────────────────────────────

// POST /api/contact       — Public (Submit form)
router.post('/', submitContact);

// GET  /api/contact       — Private (Admin view all)
router.get('/', protect, getAllContacts);

// GET  /api/contact/:id   — Private (Admin view one)
router.get('/:id', protect, getContactById);

// PATCH /api/contact/:id/read — Private (Mark as read/unread)
router.patch('/:id/read', protect, markContactRead);

// DELETE /api/contact/:id — Private (Delete inquiry)
router.delete('/:id', protect, deleteContact);

module.exports = router;
