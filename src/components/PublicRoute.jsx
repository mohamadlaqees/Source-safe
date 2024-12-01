import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Replace with Redux/Context if used
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PublicRoute;
