const Enquiry = require('../models/Enquiry');
const EnquiryStore = require('../models/core/EnquiryStore');
const { isDbReady } = require('../utils/dbReady');

const toEnquiry = (doc) => {
    const raw = doc.toObject ? doc.toObject() : doc;
    const id = String(raw._id || raw.id);
    return { ...raw, _id: id, id };
};

const submitEnquiry = async (req, res, next) => {
    try {
        const { name, phone, email, address, currentQualification, targetCountry, message } = req.body;

        if (!name || !phone || !targetCountry) {
            return res.status(400).json({ message: 'Please provide all required fields (name, phone, targetCountry)' });
        }

        if (!isDbReady()) {
            const id = Date.now().toString();
            const enquiry = EnquiryStore.add({
                _id: id,
                id,
                name,
                phone,
                email: email || '',
                address: address || '',
                currentQualification: currentQualification || '',
                targetCountry,
                message: message || '',
                createdAt: new Date().toISOString(),
            });
            return res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
        }

        const newEnquiry = await Enquiry.create({
            name,
            phone,
            email: email || '',
            address: address || '',
            currentQualification: currentQualification || '',
            targetCountry,
            message: message || ''
        });

        res.status(201).json({ message: 'Enquiry submitted successfully', enquiry: newEnquiry });
    } catch (error) {
        console.error('Error submitting enquiry:', error);
        next(error);
    }
};

const getEnquiries = async (req, res, next) => {
    try {
        if (!isDbReady()) {
            const enquiries = EnquiryStore.getAll()
                .map(toEnquiry)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            return res.json(enquiries);
        }

        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries.map(toEnquiry));
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.json(EnquiryStore.getAll().map(toEnquiry));
    }
};

const deleteEnquiry = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isDbReady()) {
            const existing = EnquiryStore.findById(id);
            if (!existing) return res.status(404).json({ message: 'Enquiry not found' });
            EnquiryStore.deleteById(id);
            return res.json({ message: 'Enquiry deleted successfully' });
        }

        const enquiry = await Enquiry.findByIdAndDelete(id);

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        res.json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        console.error('Error deleting enquiry:', error);
        next(error);
    }
};

module.exports = {
    submitEnquiry,
    getEnquiries,
    deleteEnquiry
};
