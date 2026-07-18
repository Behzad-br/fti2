// ─────────────────────────────────────────────
//  API Client — Core HTTP wrapper
//  All services import from here, not directly fetch
// ─────────────────────────────────────────────

export const BASE_URL = import.meta.env.VITE_API_URL || '/api';

/** Read the stored JWT token */
export const getToken = (): string | null =>
  localStorage.getItem('fti_auth_token');

/** Build request headers — optionally attach Bearer token */
export const buildHeaders = (withAuth = false): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (withAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/** Parse response and throw readable errors */
export async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `HTTP error ${res.status}`);
  }
  return data as T;
}
