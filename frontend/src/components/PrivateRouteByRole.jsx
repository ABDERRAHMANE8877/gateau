import { Navigate } from "react-router-dom";

export default function PrivateRouteByRole({ allowedRoles, children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  if (!isLoggedIn || !allowedRoles.includes(role)) {
    return <Navigate to="/connection" replace />;
  }

  return children;
}
