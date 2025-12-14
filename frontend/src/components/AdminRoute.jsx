import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth2";

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  // Still loading auth from localStorage
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Not an admin → redirect
  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
