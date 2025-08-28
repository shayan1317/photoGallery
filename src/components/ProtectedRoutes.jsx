import React, { useContext } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  console.log("user", user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoutes;
