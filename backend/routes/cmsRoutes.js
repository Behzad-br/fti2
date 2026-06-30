const express = require('express');
const router = express.Router();
const CMSData = require('../models/CMSData');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all CMS data
// @route   GET /api/cms
// @access  Public
router.get('/', async (req, res) => {
    try {
        const cmsRecords = await CMSData.find({});
        const result = {};
        
        // Convert array of documents to a single object with keys
        cmsRecords.forEach(record => {
            result[record.key] = record.data;
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching CMS data' });
    }
});

// @desc    Update CMS data by key
// @route   POST /api/cms/update
// @access  Private
router.post('/update', protect, async (req, res) => {
    // req.body should be an object containing key-value pairs to update
    // e.g. { homeHeroTitle: "New Title", homeUniversityPartners: [...] }
    
    try {
        const updates = req.body;
        const result = {};

        // Instead of saving each tiny field as a document, we'll save the whole CMS state 
        // under a single key 'global_cms_data' to match the frontend localStorage logic
        
        let cmsDoc = await CMSData.findOne({ key: 'global_cms_data' });
        
        if (!cmsDoc) {
            cmsDoc = new CMSData({ key: 'global_cms_data', data: updates });
        } else {
            // Merge existing data with updates
            cmsDoc.data = { ...cmsDoc.data, ...updates };
        }
        
        // Important: Tell Mongoose that the Mixed type 'data' has been modified
        cmsDoc.markModified('data');
        await cmsDoc.save();
        
        res.json(cmsDoc.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating CMS data' });
    }
});

module.exports = router;
