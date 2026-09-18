const BaseJSONArrayModel = require('./BaseJSONArrayModel');

class ContactStore extends BaseJSONArrayModel {
    constructor() {
        super('contacts.json');
    }
}

module.exports = new ContactStore();
