import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth2";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait until AuthContext loads user from localStorage
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // If not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
