import { useAuth } from "./contexts/auth-context";
import { Navigate, useLocation } from "react-router-dom";

export function RequiresAuth({ children }) {
  const { authState } = useAuth();
  const { token } = authState;
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
