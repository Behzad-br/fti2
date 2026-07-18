// ─────────────────────────────────────────────
//  API Types
// ─────────────────────────────────────────────

export interface ApiError {
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CMSPayload = Record<string, any>;
