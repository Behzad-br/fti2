const mongoose = require('mongoose');

/**
 * Contact Schema
 * Stores messages submitted via the Contact page form.
 *
 * Fields:
 *  name     — required
 *  phone    — required
 *  email    — optional
 *  country  — interested study destination
 *  message  — inquiry message
 *  isRead   — admin marks as read (default: false)
 */
const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            maxlength: [20, 'Phone number cannot exceed 20 characters'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [
                /^\S+@\S+\.\S+$/,
                'Please enter a valid email address',
            ],
        },
        country: {
            type: String,
            enum: {
                values: ['UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe', ''],
                message: '{VALUE} is not a valid country option',
            },
        },
        message: {
            type: String,
            trim: true,
            maxlength: [2000, 'Message cannot exceed 2000 characters'],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

// Index for admin queries (newest first, unread first)
contactSchema.index({ createdAt: -1 });
contactSchema.index({ isRead: 1 });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
