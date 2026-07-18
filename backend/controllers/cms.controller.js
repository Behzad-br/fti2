const CMSData = require('../models/CMSData');

// ─────────────────────────────────────────────
//  CMS Controller
//  Business logic extracted from cmsRoutes.js
// ─────────────────────────────────────────────

/**
 * @desc    Get all CMS data
 * @route   GET /api/cms
 * @access  Public
 */
const getCMSData = async (req, res) => {
    try {
        const cmsRecords = await CMSData.find({});
        const result = {};

        // Convert array of documents → single object with keys
        cmsRecords.forEach(record => {
            result[record.key] = record.data;
        });

        res.json(result);
    } catch (error) {
        console.error('[CMSController] getCMSData error:', error);
        res.status(500).json({ message: 'Server error fetching CMS data' });
    }
};

/**
 * @desc    Update CMS data (merge with existing)
 * @route   POST /api/cms/update
 * @access  Private (admin/employee)
 */
const updateCMSData = async (req, res) => {
    try {
        const updates = req.body;

        // Save under a single 'global_cms_data' key to match frontend localStorage logic
        let cmsDoc = await CMSData.findOne({ key: 'global_cms_data' });

        if (!cmsDoc) {
            cmsDoc = new CMSData({ key: 'global_cms_data', data: updates });
        } else {
            // Deep merge: existing + new updates
            cmsDoc.data = { ...cmsDoc.data, ...updates };
        }

        // Tell Mongoose that the Mixed type 'data' was modified
        cmsDoc.markModified('data');
        await cmsDoc.save();

        res.json(cmsDoc.data);
    } catch (error) {
        console.error('[CMSController] updateCMSData error:', error);
        res.status(500).json({ message: 'Server error updating CMS data' });
    }
};

module.exports = { getCMSData, updateCMSData };
