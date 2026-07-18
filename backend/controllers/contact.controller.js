const Contact = require('../models/Contact');
const AppError = require('../utils/AppError');

// ─────────────────────────────────────────────────────────────────────────────
//  Contact Controller
//  Handles: Contact page form submissions + admin inquiry management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @desc    Submit contact form (public)
 * @route   POST /api/contact
 * @access  Public
 * @body    { name, phone, email?, country?, message? }
 * @returns 201 Created — { message, data }
 * @throws  400 Bad Request — if name or phone is missing
 */
const submitContact = async (req, res, next) => {
    try {
        const { name, phone, email, country, message } = req.body;

        // Validate required fields
        if (!name || !phone) {
            return next(new AppError('Name and phone number are required', 400));
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

/**
 * @desc    Get all contact inquiries (admin only)
 * @route   GET /api/contact
 * @access  Private (admin/employee)
 * @query   ?page=1&limit=20&isRead=false
 * @returns 200 OK — { total, page, limit, data }
 */
const getAllContacts = async (req, res, next) => {
    try {
        const page  = parseInt(req.query.page)  || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip  = (page - 1) * limit;

        // Optional filter: isRead=true|false
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

/**
 * @desc    Get single contact inquiry by ID (admin only)
 * @route   GET /api/contact/:id
 * @access  Private (admin/employee)
 * @returns 200 OK — { data }
 * @throws  404 Not Found — if contact doesn't exist
 */
const getContactById = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return next(new AppError(`Contact inquiry not found with ID: ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Mark contact as read / unread (admin only)
 * @route   PATCH /api/contact/:id/read
 * @access  Private (admin/employee)
 * @body    { isRead: true|false }
 * @returns 200 OK — { message, data }
 * @throws  404 Not Found
 */
const markContactRead = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: req.body.isRead !== undefined ? req.body.isRead : true },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return next(new AppError(`Contact inquiry not found with ID: ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: `Marked as ${contact.isRead ? 'read' : 'unread'}`,
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Delete contact inquiry (admin only)
 * @route   DELETE /api/contact/:id
 * @access  Private (admin)
 * @returns 200 OK — { message }
 * @throws  404 Not Found
 */
const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return next(new AppError(`Contact inquiry not found with ID: ${req.params.id}`, 404));
        }

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
