// ─────────────────────────────────────────────
//  FTI Backend API Service
//  All HTTP calls to the Express backend go through here.
// ─────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ── Helper: get stored auth token ─────────────
const getToken = (): string | null => localStorage.getItem('fti_auth_token');

// ── Helper: build default headers ─────────────
const buildHeaders = (withAuth = false): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (withAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// ── Helper: handle response ────────────────────
async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    // Use the message from API if available
    throw new Error(data.message || `HTTP error ${res.status}`);
  }
  return data as T;
}

// ─────────────────────────────────────────────
//  AUTH API
// ─────────────────────────────────────────────

export interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'student';
  token: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'student';
}

export const authApi = {
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

  /** GET /api/auth/me */
  me: async (): Promise<UserProfile> => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: buildHeaders(true),
    });
    return handleResponse<UserProfile>(res);
  },
};

// ─────────────────────────────────────────────
//  CMS API
// ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CMSPayload = Record<string, any>;

export const cmsApi = {
  /** GET /api/cms — public, no auth needed */
  get: async (): Promise<CMSPayload> => {
    const res = await fetch(`${BASE_URL}/cms`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    return handleResponse<CMSPayload>(res);
  },

  /** POST /api/cms/update — requires auth */
  update: async (data: CMSPayload): Promise<CMSPayload> => {
    const res = await fetch(`${BASE_URL}/cms/update`, {
      method: 'POST',
      headers: buildHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<CMSPayload>(res);
  },
};
