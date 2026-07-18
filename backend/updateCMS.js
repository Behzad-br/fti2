const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CMSData = require('./models/CMSData');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fti').then(async () => {
    try {
        const cms = await CMSData.findOne({ id: 'global_cms_data' });
        if (cms) {
            let data = cms.data;
            if (data.aboutHeroTitle) {
                data.aboutHeroTitle = data.aboutHeroTitle.replace('2012', '2006');
            }
            cms.data = data;
            cms.markModified('data');
            await cms.save();
            console.log('Successfully updated CMS data to 2006');
        } else {
            console.log('No CMS data found in DB');
        }
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}).catch(err => {
    console.error('Mongo connection failed', err);
    process.exit(1);
});
