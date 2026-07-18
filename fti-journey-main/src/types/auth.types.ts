// ─────────────────────────────────────────────
//  Auth Types
// ─────────────────────────────────────────────

export type UserRole = 'admin' | 'employee' | 'student';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string, role?: string) => Promise<LoginResponse>;
  logout: () => void;
}
