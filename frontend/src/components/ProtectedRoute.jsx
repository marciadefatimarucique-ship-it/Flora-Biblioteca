import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const nomeUsuario = localStorage.getItem("nomeUsuario");

  if (!token || !nomeUsuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
