import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth2";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
