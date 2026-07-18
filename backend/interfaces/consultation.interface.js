/**
 * Consultation Interfaces
 *
 * @typedef {'Matriculation'|'Intermediate'|"Bachelor's"|"Master's"|'Other'} Qualification
 * @typedef {'UK'|'Canada'|'Australia'|'Ireland'|'USA'|'Europe'|'Other'} Country
 * @typedef {'pending'|'scheduled'|'completed'|'cancelled'} ConsultationStatus
 *
 * @typedef {Object} ConsultationBody
 * @property {string} name                     - Full name (required)
 * @property {string} phone                    - Phone/WhatsApp (required)
 * @property {string} [email]                  - Email address
 * @property {Qualification} [currentQualification]
 * @property {Country} [targetCountry]         - Preferred study destination
 * @property {string} [message]                - Any specific question
 *
 * @typedef {Object} ConsultationDocument
 * @property {import('mongoose').ObjectId} _id
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {Qualification} currentQualification
 * @property {Country} targetCountry
 * @property {string} message
 * @property {ConsultationStatus} status       - Default: 'pending'
 * @property {string} [scheduledDate]          - Set by admin when booking a slot
 * @property {Date} createdAt
 */

module.exports = {};
