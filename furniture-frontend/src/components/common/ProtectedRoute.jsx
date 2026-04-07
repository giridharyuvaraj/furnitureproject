import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role) {
    const r = user.role;
    if (!r || (r !== role && r !== `ROLE_${role}`)) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;
