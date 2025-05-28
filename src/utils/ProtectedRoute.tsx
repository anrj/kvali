import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/atomic/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Only show loading on initial page load, not on auth state changes
  if (loading && user === null) {
    return <LoadingSpinner centered minHeight="100vh" />;
  }

  if (!user && !loading) {
    return (
      <Navigate
        to={`/login?returnTo=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        replace
      />
    );
  }

  return <>{children}</>;
};
