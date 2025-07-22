import React from "react";
import { Navigate } from "react-router-dom";

function Protect({ children }) {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default Protect;