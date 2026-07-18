// ─────────────────────────────────────────────
//  CMS Service — GET /api/cms, POST /api/cms/update
// ─────────────────────────────────────────────

import { BASE_URL, buildHeaders, handleResponse } from './api.client';
import type { CMSPayload } from '@/types/api.types';

export const cmsService = {
  /** GET /api/cms — public, no auth needed */
  get: async (): Promise<CMSPayload> => {
    const res = await fetch(`${BASE_URL}/cms`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    return handleResponse<CMSPayload>(res);
  },

  /** POST /api/cms/update — requires admin/employee auth */
  update: async (data: CMSPayload): Promise<CMSPayload> => {
    const res = await fetch(`${BASE_URL}/cms/update`, {
      method: 'POST',
      headers: buildHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<CMSPayload>(res);
  },
};
