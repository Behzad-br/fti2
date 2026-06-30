const mongoose = require('mongoose');

const cmsDataSchema = mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true, // e.g., 'global_cms_data'
        },
        data: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
            default: {}
        }
    },
    {
        timestamps: true,
    }
);

const CMSData = mongoose.model('CMSData', cmsDataSchema);

module.exports = CMSData;
