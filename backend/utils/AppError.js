/**
 * AppError — Custom operational error class
 *
 * Usage:
 *   throw new AppError('User not found', 404);
 *   throw new AppError('Invalid credentials', 401);
 *
 * HTTP Status Code Reference:
 *   200 — OK (success)
 *   201 — Created (new resource saved)
 *   400 — Bad Request (missing/invalid fields)
 *   401 — Unauthorized (no token or invalid token)
 *   403 — Forbidden (valid token but wrong role)
 *   404 — Not Found (record doesn't exist)
 *   409 — Conflict (duplicate entry)
 *   422 — Unprocessable Entity (validation failed)
 *   500 — Internal Server Error (unexpected server/db failure)
 */
class AppError extends Error {
    /**
     * @param {string} message  — Human-readable error message
     * @param {number} statusCode — HTTP status code (400, 401, 403, 404, 409, 422, 500)
     */
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Mark as operational error (expected / handled)
        this.isOperational = true;

        // Capture stack trace (exclude constructor from trace)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
