// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * A protected route wrapper that only allows access
 * if the user is logged in (exists in Redux state).
 */
export default function ProtectedRoute() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Otherwise, render the nested route content
  return <Outlet />;
}
