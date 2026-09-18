const Contact = require('../models/Contact');
const ContactStore = require('../models/core/ContactStore');
const AppError = require('../utils/AppError');
const { isDbReady } = require('../utils/dbReady');

const toContact = (doc) => {
    const raw = doc.toObject ? doc.toObject() : doc;
    const id = String(raw._id || raw.id);
    return { ...raw, _id: id, id };
};

const submitContact = async (req, res, next) => {
    try {
        const { name, phone, email, country, message } = req.body;

        if (!name || !phone) {
            return next(new AppError('Name and phone number are required', 400));
        }

        if (!isDbReady()) {
            const id = Date.now().toString();
            const contact = ContactStore.add({
                _id: id,
                id,
                name,
                phone,
                email: email || '',
                country: country || '',
                message: message || '',
                isRead: false,
                createdAt: new Date().toISOString(),
            });
            return res.status(201).json({
                status: 'success',
                statusCode: 201,
                message: 'Your message has been received. We will get back to you within 24 hours.',
                data: contact,
            });
        }

        const contact = await Contact.create({ name, phone, email, country, message });

        res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'Your message has been received. We will get back to you within 24 hours.',
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const page  = parseInt(req.query.page)  || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip  = (page - 1) * limit;

        if (!isDbReady()) {
            let data = ContactStore.getAll().map(toContact)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            if (req.query.isRead !== undefined) {
                const isRead = req.query.isRead === 'true';
                data = data.filter(item => !!item.isRead === isRead);
            }
            const total = data.length;
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                total,
                page,
                limit,
                data: data.slice(skip, skip + limit),
            });
        }

        const filter = {};
        if (req.query.isRead !== undefined) {
            filter.isRead = req.query.isRead === 'true';
        }

        const [data, total] = await Promise.all([
            Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Contact.countDocuments(filter),
        ]);

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            total,
            page,
            limit,
            data,
        });
    } catch (err) {
        next(err);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const contact = isDbReady()
            ? await Contact.findById(req.params.id)
            : ContactStore.findById(req.params.id);

        if (!contact) {
            return next(new AppError(`Contact inquiry not found with ID: ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: toContact(contact),
        });
    } catch (err) {
        next(err);
    }
};

const markContactRead = async (req, res, next) => {
    try {
        const isRead = req.body.isRead !== undefined ? req.body.isRead : true;

        const contact = isDbReady()
            ? await Contact.findByIdAndUpdate(req.params.id, { isRead }, { new: true, runValidators: true })
            : ContactStore.updateById(req.params.id, { isRead });

        if (!contact) {
            return next(new AppError(`Contact inquiry not found with ID: ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: `Marked as ${contact.isRead ? 'read' : 'unread'}`,
            data: toContact(contact),
        });
    } catch (err) {
        next(err);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const contact = isDbReady()
            ? await Contact.findByIdAndDelete(req.params.id)
            : ContactStore.findById(req.params.id);

        if (!contact) {
            return next(new AppError(`Contact inquiry not found with ID: ${req.params.id}`, 404));
        }

        if (!isDbReady()) ContactStore.deleteById(req.params.id);

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Contact inquiry deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    submitContact,
    getAllContacts,
    getContactById,
    markContactRead,
    deleteContact,
};
