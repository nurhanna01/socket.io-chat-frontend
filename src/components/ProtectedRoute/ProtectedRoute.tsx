import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { token } = UseAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
