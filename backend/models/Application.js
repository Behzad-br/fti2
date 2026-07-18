const mongoose = require('mongoose');

/**
 * Application Schema
 * Stores student study abroad applications (Apply page)
 * AND IELTS registration applications (ApplyIELTS page).
 *
 * type field distinguishes between the two.
 */
const applicationSchema = new mongoose.Schema(
    {
        // ── Common Fields ─────────────────────────────────────
        type: {
            type: String,
            enum: {
                values: ['study_abroad', 'ielts'],
                message: 'Application type must be "study_abroad" or "ielts"',
            },
            required: [true, 'Application type is required'],
        },
        name: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            maxlength: [20, 'Phone cannot exceed 20 characters'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        status: {
            type: String,
            enum: {
                values: ['pending', 'reviewing', 'approved', 'rejected'],
                message: 'Status must be pending, reviewing, approved, or rejected',
            },
            default: 'pending',
        },
        adminNotes: {
            type: String,
            trim: true,
        },

        // ── Study Abroad Specific ──────────────────────────────
        qualification: {
            type: String,
            enum: ['Matriculation', 'Intermediate', "Bachelor's", "Master's", 'Other', ''],
        },
        gpa: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            enum: ['UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe', 'Other', ''],
        },
        ieltsStatus: {
            type: String,
            enum: ['Not taken', 'Preparing', 'Score: Below 6.0', 'Score: 6.0-6.5', 'Score: 7.0+', ''],
        },
        intake: {
            type: String,
            enum: ['Sep 2025', 'Jan 2026', 'Sep 2026', 'Not sure', ''],
        },

        // ── IELTS Specific ────────────────────────────────────
        cnic: {
            type: String,
            trim: true,
        },
        examDate: {
            type: String,
        },
        testType: {
            type: String,
            enum: ['Academic', 'General Training', ''],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for admin panel queries
applicationSchema.index({ type: 1, status: 1 });
applicationSchema.index({ createdAt: -1 });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
