import React, { useContext } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoutes;
