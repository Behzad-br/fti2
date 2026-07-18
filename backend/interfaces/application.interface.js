/**
 * Application Interfaces (Study Abroad + IELTS registrations)
 *
 * @typedef {'Matriculation'|'Intermediate'|"Bachelor's"|"Master's"|'Other'} Qualification
 * @typedef {'UK'|'Canada'|'Australia'|'Ireland'|'USA'|'Europe'|'Other'} Country
 * @typedef {'Not taken'|'Preparing'|'Score: Below 6.0'|'Score: 6.0-6.5'|'Score: 7.0+'} IELTSStatus
 * @typedef {'Sep 2025'|'Jan 2026'|'Sep 2026'|'Not sure'} Intake
 * @typedef {'pending'|'reviewing'|'approved'|'rejected'} ApplicationStatus
 *
 * @typedef {Object} StudyAbroadApplicationBody
 * @property {string} name              - Full name (required)
 * @property {string} phone             - Phone/WhatsApp (required)
 * @property {string} [email]           - Email address
 * @property {Qualification} [qualification]
 * @property {string} [gpa]             - GPA or percentage
 * @property {Country} country          - Preferred country (required)
 * @property {IELTSStatus} [ielts]      - IELTS/PTE status
 * @property {Intake} [intake]          - Preferred intake
 *
 * @typedef {Object} IELTSApplicationBody
 * @property {string} name              - Full name (required)
 * @property {string} phone             - Phone/WhatsApp (required)
 * @property {string} [email]           - Email address
 * @property {string} [cnic]            - CNIC number
 * @property {string} [examDate]        - Preferred exam date
 * @property {string} [testType]        - 'Academic' or 'General Training'
 *
 * @typedef {Object} ApplicationDocument
 * @property {import('mongoose').ObjectId} _id
 * @property {'study_abroad'|'ielts'} type
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {ApplicationStatus} status
 * @property {Date} createdAt
 */

module.exports = {};
