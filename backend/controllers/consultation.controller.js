const Consultation = require('../models/Consultation');
const AppError = require('../utils/AppError');

// ─────────────────────────────────────────────────────────────────────────────
//  Consultation Controller
//  Handles: Free Consultation page + admin booking management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @desc    Book a free consultation (public)
 * @route   POST /api/consultation
 * @access  Public
 * @body    { name, phone, email?, currentQualification?, targetCountry?, message? }
 * @returns 201 Created — { message, data }
 * @throws  400 Bad Request — name or phone missing
 */
const bookConsultation = async (req, res, next) => {
    try {
        const { name, phone, email, currentQualification, targetCountry, message } = req.body;

        if (!name || !phone) {
            return next(new AppError('Name and phone number are required', 400));
        }

        const consultation = await Consultation.create({
            name,
            phone,
            email,
            currentQualification,
            targetCountry,
            message,
        });

        res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'Consultation booked! Our counsellor will contact you to confirm your slot.',
            data: consultation,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get all consultations (admin only)
 * @route   GET /api/consultation
 * @access  Private (admin/employee)
 * @query   ?page=1&limit=20&status=pending
 * @returns 200 OK — { total, page, limit, data }
 */
const getAllConsultations = async (req, res, next) => {
    try {
        const page  = parseInt(req.query.page)  || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip  = (page - 1) * limit;

        const filter = {};
        if (req.query.status) filter.status = req.query.status;

        const [data, total] = await Promise.all([
            Consultation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Consultation.countDocuments(filter),
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
 * @desc    Get single consultation by ID (admin only)
 * @route   GET /api/consultation/:id
 * @access  Private (admin/employee)
 * @returns 200 OK — { data }
 * @throws  404 Not Found
 */
const getConsultationById = async (req, res, next) => {
    try {
        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return next(
                new AppError(`Consultation not found with ID: ${req.params.id}`, 404)
            );
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: consultation,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update consultation status + schedule + notes (admin only)
 * @route   PATCH /api/consultation/:id/status
 * @access  Private (admin/employee)
 * @body    { status?, scheduledDate?, adminNotes? }
 * @returns 200 OK — { message, data }
 * @throws  400 — invalid status
 * @throws  404 — not found
 */
const updateConsultationStatus = async (req, res, next) => {
    try {
        const { status, scheduledDate, adminNotes } = req.body;
        const validStatuses = ['pending', 'scheduled', 'completed', 'cancelled'];

        if (status && !validStatuses.includes(status)) {
            return next(
                new AppError(
                    `Invalid status "${status}". Must be one of: ${validStatuses.join(', ')}`,
                    400
                )
            );
        }

        const updates = {};
        if (status)        updates.status        = status;
        if (scheduledDate) updates.scheduledDate = scheduledDate;
        if (adminNotes)    updates.adminNotes    = adminNotes;

        const consultation = await Consultation.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!consultation) {
            return next(
                new AppError(`Consultation not found with ID: ${req.params.id}`, 404)
            );
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: `Consultation updated — status: "${consultation.status}"`,
            data: consultation,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Delete consultation (admin only)
 * @route   DELETE /api/consultation/:id
 * @access  Private (admin)
 * @returns 200 OK — { message }
 * @throws  404 Not Found
 */
const deleteConsultation = async (req, res, next) => {
    try {
        const consultation = await Consultation.findByIdAndDelete(req.params.id);

        if (!consultation) {
            return next(
                new AppError(`Consultation not found with ID: ${req.params.id}`, 404)
            );
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Consultation booking deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    bookConsultation,
    getAllConsultations,
    getConsultationById,
    updateConsultationStatus,
    deleteConsultation,
};
