import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Reader from "./pages/Reader";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Proteção de rotas Administrativas
const RotaAdminProtegida = ({ children }) => {
  const cargo = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  if (cargo !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/reader/:id" element={<Reader />} />

        {/* Páginas protegidas (utilizador autenticado) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Painel Admin (apenas admins) */}
        <Route path="/admin" element={<RotaAdminProtegida><AdminPanel /></RotaAdminProtegida>} />

        {/* Redirecionamento para rotas inexistentes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
