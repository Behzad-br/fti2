import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { authApi, type LoginResponse, type UserProfile } from '@/services/api';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'student';
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role?: string) => Promise<LoginResponse>;
  logout: () => void;
}

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('fti_auth_token')
  );
  const [isLoading, setIsLoading] = useState<boolean>(!!localStorage.getItem('fti_auth_token'));

  // ── On mount: if a token exists, verify it and fetch the current user ──
  useEffect(() => {
    const storedToken = localStorage.getItem('fti_auth_token');
    const storedUser = localStorage.getItem('fti_auth_user');

    if (storedToken && storedUser) {
      try {
        // Restore from localStorage immediately (no flicker)
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        // Corrupted data — clear
        localStorage.removeItem('fti_auth_token');
        localStorage.removeItem('fti_auth_user');
      }
    }

    if (storedToken) {
      // Optionally re-verify token with backend in background
      authApi
        .me()
        .then((profile: UserProfile) => {
          const freshUser: AuthUser = {
            _id: profile._id,
            name: profile.name,
            email: profile.email,
            role: profile.role,
          };
          setUser(freshUser);
          localStorage.setItem('fti_auth_user', JSON.stringify(freshUser));
        })
        .catch(() => {
          // Token expired / invalid — log the user out silently
          localStorage.removeItem('fti_auth_token');
          localStorage.removeItem('fti_auth_user');
          setUser(null);
          setToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // ── login ──────────────────────────────────────────────────────────────
  const login = useCallback(
    async (email: string, password: string, role?: string): Promise<LoginResponse> => {
      const data = await authApi.login(email, password, role);

      const loggedInUser: AuthUser = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      // Persist token and user
      localStorage.setItem('fti_auth_token', data.token);
      localStorage.setItem('fti_auth_user', JSON.stringify(loggedInUser));

      setToken(data.token);
      setUser(loggedInUser);

      return data;
    },
    []
  );

  // ── logout ─────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('fti_auth_token');
    localStorage.removeItem('fti_auth_user');
    setToken(null);
    setUser(null);
  }, []);

  // ─────────────────────────────────────────────
  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'employee',
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
