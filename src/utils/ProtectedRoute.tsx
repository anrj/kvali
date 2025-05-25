import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/atomic/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoadingBackground = styled.div`
  background-color: #fdf2e9;
  min-height: 100vh;
`;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <LoadingBackground>
        <LoadingSpinner centered minHeight="100vh" />
      </LoadingBackground>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
