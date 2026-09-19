import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import * as authService from "./auth.service";
import type { Admin, LoginPayload } from "./auth.types";

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  actionLoading: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAdmin() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await authService.getProfile();
        setAdmin(profile);
      } catch {
        localStorage.removeItem("token");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    }

    loadAdmin();
  }, []);

  const login = useCallback(
    async (credentials: LoginPayload) => {
      setActionLoading(true);
      try {
        const { token, admin } = await authService.login(credentials);
        localStorage.setItem("token", token);
        setAdmin(admin);
        navigate("/products");
      } finally {
        setActionLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAdmin(null);
    navigate("/admin/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        loading,
        actionLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}