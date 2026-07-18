const Application = require('../models/Application');
const AppError = require('../utils/AppError');

// ─────────────────────────────────────────────────────────────────────────────
//  Application Controller
//  Handles: Apply page (study abroad) + ApplyIELTS page + admin management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @desc    Submit study abroad application (Apply page)
 * @route   POST /api/apply
 * @access  Public
 * @body    { name, phone, email?, qualification?, gpa?, country, ieltsStatus?, intake? }
 * @returns 201 Created — { message, data }
 * @throws  400 Bad Request — if name, phone, or country is missing
 */
const submitStudyAbroadApplication = async (req, res, next) => {
    try {
        const { name, phone, email, qualification, gpa, country, ielts, intake } = req.body;

        if (!name || !phone || !country) {
            return next(
                new AppError('Name, phone number, and preferred country are required', 400)
            );
        }

        const application = await Application.create({
            type: 'study_abroad',
            name,
            phone,
            email,
            qualification,
            gpa,
            country,
            ieltsStatus: ielts,
            intake,
        });

        res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'Application submitted successfully! Our counsellor will contact you within 24 hours.',
            data: application,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Submit IELTS registration application (ApplyIELTS page)
 * @route   POST /api/apply/ielts
 * @access  Public
 * @body    { name, phone, email?, cnic?, examDate?, testType? }
 * @returns 201 Created — { message, data }
 * @throws  400 Bad Request — if name or phone is missing
 */
const submitIELTSApplication = async (req, res, next) => {
    try {
        const { name, phone, email, cnic, examDate, testType } = req.body;

        if (!name || !phone) {
            return next(new AppError('Name and phone number are required', 400));
        }

        const application = await Application.create({
            type: 'ielts',
            name,
            phone,
            email,
            cnic,
            examDate,
            testType,
        });

        res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'IELTS registration submitted! We will contact you with exam slot details.',
            data: application,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get all applications (admin only)
 * @route   GET /api/apply
 * @access  Private (admin/employee)
 * @query   ?page=1&limit=20&type=study_abroad|ielts&status=pending
 * @returns 200 OK — { total, page, limit, data }
 */
const getAllApplications = async (req, res, next) => {
    try {
        const page   = parseInt(req.query.page)  || 1;
        const limit  = parseInt(req.query.limit) || 20;
        const skip   = (page - 1) * limit;

        const filter = {};
        if (req.query.type)   filter.type   = req.query.type;
        if (req.query.status) filter.status = req.query.status;

        const [data, total] = await Promise.all([
            Application.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Application.countDocuments(filter),
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
 * @desc    Get single application by ID (admin only)
 * @route   GET /api/apply/:id
 * @access  Private (admin/employee)
 * @returns 200 OK — { data }
 * @throws  404 Not Found
 */
const getApplicationById = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return next(new AppError(`Application not found with ID: ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: application,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update application status + admin notes (admin only)
 * @route   PATCH /api/apply/:id/status
 * @access  Private (admin/employee)
 * @body    { status: 'pending'|'reviewing'|'approved'|'rejected', adminNotes? }
 * @returns 200 OK — { message, data }
 * @throws  400 — invalid status
 * @throws  404 — not found
 */
const updateApplicationStatus = async (req, res, next) => {
    try {
        const { status, adminNotes } = req.body;
        const validStatuses = ['pending', 'reviewing', 'approved', 'rejected'];

        if (status && !validStatuses.includes(status)) {
            return next(
                new AppError(
                    `Invalid status "${status}". Must be one of: ${validStatuses.join(', ')}`,
                    400
                )
            );
        }

        const updates = {};
        if (status)     updates.status     = status;
        if (adminNotes) updates.adminNotes = adminNotes;

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!application) {
            return next(new AppError(`Application not found with ID: ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: `Application status updated to "${application.status}"`,
            data: application,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Delete application (admin only)
 * @route   DELETE /api/apply/:id
 * @access  Private (admin)
 * @returns 200 OK — { message }
 * @throws  404 Not Found
 */
const deleteApplication = async (req, res, next) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);

        if (!application) {
            return next(new AppError(`Application not found with ID: ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Application deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    submitStudyAbroadApplication,
    submitIELTSApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication,
};
