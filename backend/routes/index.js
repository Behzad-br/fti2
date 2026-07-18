const express = require('express');
const router = express.Router();

// ─────────────────────────────────────────────
//  Parent Router (Mounts all feature routes)
// ─────────────────────────────────────────────

// 1. Auth & Users
router.use('/auth', require('./auth/authRoutes'));

// 2. CMS (Dynamic Pages)
router.use('/cms', require('./cms/cmsRoutes'));

// 3. Contact Form
router.use('/contact', require('./contact/contactRoutes'));

// 4. Applications (Study Abroad + IELTS)
router.use('/apply', require('./apply/applyRoutes'));

// 5. Free Consultation
router.use('/consultation', require('./consultation/consultationRoutes'));

module.exports = router;
