import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { authService } from '@/services/auth.service';
import type {
  AuthUser,
  AuthContextType,
  LoginResponse,
  UserProfile,
} from '@/types/auth.types';

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
  const [isLoading, setIsLoading] = useState<boolean>(
    !!localStorage.getItem('fti_auth_token')
  );

  // On mount: restore from localStorage and verify with backend
  useEffect(() => {
    const storedToken = localStorage.getItem('fti_auth_token');
    const storedUser = localStorage.getItem('fti_auth_user');

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem('fti_auth_token');
        localStorage.removeItem('fti_auth_user');
      }
    }

    if (storedToken) {
      // Background verification
      authService
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

  const login = useCallback(
    async (email: string, password: string, role?: string): Promise<LoginResponse> => {
      const data = await authService.login(email, password, role);
      const loggedInUser: AuthUser = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      };
      localStorage.setItem('fti_auth_token', data.token);
      localStorage.setItem('fti_auth_user', JSON.stringify(loggedInUser));
      setToken(data.token);
      setUser(loggedInUser);
      return data;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('fti_auth_token');
    localStorage.removeItem('fti_auth_user');
    setToken(null);
    setUser(null);
  }, []);

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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
