// ─────────────────────────────────────────────
//  Services — Barrel Export
// ─────────────────────────────────────────────
export * from './api.client';
export * from './auth.service';
export * from './cms.service';

// Legacy re-export for backward compatibility
export { authService as authApi } from './auth.service';
export { cmsService as cmsApi } from './cms.service';
