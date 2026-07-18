const mongoose = require('mongoose');

/**
 * Consultation Schema
 * Stores free consultation bookings (FreeConsultation page).
 */
const consultationSchema = new mongoose.Schema(
    {
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
        currentQualification: {
            type: String,
            enum: ['Matriculation', 'Intermediate', "Bachelor's", "Master's", 'Other', ''],
        },
        targetCountry: {
            type: String,
            enum: ['UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe', 'Other', ''],
        },
        message: {
            type: String,
            trim: true,
            maxlength: [1000, 'Message cannot exceed 1000 characters'],
        },
        status: {
            type: String,
            enum: {
                values: ['pending', 'scheduled', 'completed', 'cancelled'],
                message: 'Status must be pending, scheduled, completed, or cancelled',
            },
            default: 'pending',
        },
        scheduledDate: {
            type: String, // e.g. "2025-09-15 10:00 AM"
        },
        adminNotes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

consultationSchema.index({ status: 1, createdAt: -1 });

const Consultation = mongoose.model('Consultation', consultationSchema);
module.exports = Consultation;
