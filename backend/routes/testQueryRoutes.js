const express = require('express');
const router = express.Router();
const { submitTestQuery, getTestQueries } = require('../controllers/testQuery.controller');
const { protect, staff } = require('../middleware/authMiddleware');
const { formLimiter } = require('../middleware/rateLimiter');

// Public route to submit a query
router.post('/', formLimiter, submitTestQuery);

// Private staff route to get all queries
router.get('/', protect, staff, getTestQueries);

module.exports = router;
