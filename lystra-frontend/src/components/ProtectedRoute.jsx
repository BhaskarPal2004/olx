import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRole }) => {
  const location = useLocation();
  const {  role } = useSelector((state) => state.auth);

  if (!role) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (role !== allowedRole) {
    return <Navigate to={`/${role}/home`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
