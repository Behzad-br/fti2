/**
 * Contact Interfaces
 *
 * @typedef {Object} ContactBody
 * @property {string} name            - Full name (required)
 * @property {string} phone           - Phone/WhatsApp number (required)
 * @property {string} [email]         - Email address (optional)
 * @property {string} [country]       - Interested country (optional)
 * @property {string} [message]       - Message text (optional)
 *
 * @typedef {Object} ContactDocument
 * @property {import('mongoose').ObjectId} _id
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} country
 * @property {string} message
 * @property {boolean} isRead         - Whether admin has read this inquiry
 * @property {Date} createdAt
 * @property {Date} updatedAt
 *
 * @typedef {Object} ContactListResponse
 * @property {number} total           - Total count of contacts
 * @property {ContactDocument[]} data - List of contact inquiries
 */

module.exports = {};
