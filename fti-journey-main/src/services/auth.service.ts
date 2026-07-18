// ─────────────────────────────────────────────
//  Auth Service — POST /api/auth/login, GET /api/auth/me
// ─────────────────────────────────────────────

import { BASE_URL, buildHeaders, handleResponse } from './api.client';
import type { LoginResponse, UserProfile } from '@/types/auth.types';

export const authService = {
  /** POST /api/auth/login */
  login: async (
    email: string,
    password: string,
    role?: string
  ): Promise<LoginResponse> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ email, password, ...(role ? { role } : {}) }),
    });
    return handleResponse<LoginResponse>(res);
  },

  /** GET /api/auth/me — requires auth token */
  me: async (): Promise<UserProfile> => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: buildHeaders(true),
    });
    return handleResponse<UserProfile>(res);
  },
};
