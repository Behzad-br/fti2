const BaseJSONArrayModel = require('./BaseJSONArrayModel');

class EnquiryStore extends BaseJSONArrayModel {
    constructor() {
        super('enquiries.json');
    }
}

module.exports = new EnquiryStore();
