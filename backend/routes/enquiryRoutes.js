const express = require('express');
const router = express.Router();
const { submitEnquiry, getEnquiries, deleteEnquiry } = require('../controllers/enquiry.controller');
const { protect, staff } = require('../middleware/authMiddleware');
const validateResource = require('../middleware/validateResource');
const { formLimiter } = require('../middleware/rateLimiter');
const { submitEnquirySchema } = require('../schemas/enquiry.schema');

// Public route to submit an enquiry
router.post('/', formLimiter, validateResource(submitEnquirySchema), submitEnquiry);

// Private staff routes
router.get('/', protect, staff, getEnquiries);
router.delete('/:id', protect, staff, deleteEnquiry);

module.exports = router;
