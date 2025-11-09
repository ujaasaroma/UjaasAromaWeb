// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((s) => s.user);
  const location = useLocation();


  if (!user) {
    // 🚀 Pass the "from" location so Authorization knows where to return
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
