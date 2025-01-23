import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const token = localStorage.getItem("token");
    setStoredToken(token);
  }, []);
  if (storedToken) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
