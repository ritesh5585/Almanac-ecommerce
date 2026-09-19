import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../features/auth/AuthContext";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-sm text-[#6F7268]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#AD8A3E] border-t-transparent rounded-full animate-spin" />
          <span>Verifying authorization...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
