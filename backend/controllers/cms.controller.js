const CMSData = require('../models/CMSData');
const CMSStore = require('../models/core/CMSStore');
const { isDbReady } = require('../utils/dbReady');

const getCMSData = async (req, res) => {
    try {
        if (!isDbReady()) {
            return res.json(CMSStore.getAll());
        }

        const cmsRecords = await CMSData.find({});
        const result = {};
        cmsRecords.forEach(record => {
            result[record.key] = record.data;
        });
        res.json(result);
    } catch (error) {
        console.error('[CMSController] getCMSData error:', error);
        res.json(CMSStore.getAll());
    }
};

const updateCMSData = async (req, res) => {
    try {
        const updates = req.body;

        if (!isDbReady()) {
            const data = CMSStore.update(updates);
            return res.json(data);
        }

        let cmsDoc = await CMSData.findOne({ key: 'global_cms_data' });

        if (!cmsDoc) {
            cmsDoc = new CMSData({ key: 'global_cms_data', data: updates });
        } else {
            cmsDoc.data = { ...cmsDoc.data, ...updates };
        }

        cmsDoc.markModified('data');
        await cmsDoc.save();
        CMSStore.update(updates);

        res.json(cmsDoc.data);
    } catch (error) {
        console.error('[CMSController] updateCMSData error:', error);
        try {
            const data = CMSStore.update(req.body);
            return res.json(data);
        } catch {
            res.status(500).json({ message: 'Server error updating CMS data' });
        }
    }
};

module.exports = { getCMSData, updateCMSData };
