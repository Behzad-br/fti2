const path = require('path');
const fs = require('fs');

class CMSStore {
    constructor() {
        this.filepath = path.join(__dirname, '../../data/cms.json');
        if (!fs.existsSync(this.filepath)) {
            fs.writeFileSync(this.filepath, JSON.stringify({ global_cms_data: {} }, null, 2), 'utf8');
        }
    }

    getAll() {
        try {
            return JSON.parse(fs.readFileSync(this.filepath, 'utf8'));
        } catch {
            return { global_cms_data: {} };
        }
    }

    update(updates) {
        const current = this.getAll();
        const existing = current.global_cms_data || {};
        current.global_cms_data = { ...existing, ...updates };
        fs.writeFileSync(this.filepath, JSON.stringify(current, null, 2), 'utf8');
        return current.global_cms_data;
    }
}

module.exports = new CMSStore();
