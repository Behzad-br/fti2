// ─────────────────────────────────────────────
//  Interfaces — Barrel Export
// ─────────────────────────────────────────────

/**
 * All JSDoc interface definitions for FTI backend.
 *
 * Import in your files for IDE intellisense:
 *   const { } = require('../interfaces');
 *   // then use JSDoc @type annotations referencing the typedefs
 */

module.exports = {
    ...require('./auth.interface'),
    ...require('./contact.interface'),
    ...require('./application.interface'),
    ...require('./consultation.interface'),
};
