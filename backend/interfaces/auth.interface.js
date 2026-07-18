/**
 * Auth Interfaces (JSDoc type definitions)
 *
 * @typedef {Object} LoginBody
 * @property {string} email        - User email address
 * @property {string} password     - User password (plaintext, hashed in DB)
 * @property {'admin'|'employee'|'student'} [role] - Optional role filter
 *
 * @typedef {Object} LoginResponse
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {'admin'|'employee'|'student'} role
 * @property {string} token        - JWT access token
 *
 * @typedef {Object} UserProfile
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {'admin'|'employee'|'student'} role
 */

module.exports = {};
