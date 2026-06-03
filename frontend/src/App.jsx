import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import BookDetails from "./pages/BookDetails";
import Comments from "./pages/Comments";
import Profile from "./pages/Profile";
import Reader from "./pages/Reader";
import AdminPanel from "./pages/AdminPanel";
import AddBook from "./pages/AddBook";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Componente de Proteção para rotas Administrativas
const RotaAdminProtegida = ({ children }) => {
  const cargo = localStorage.getItem("userRole");
  if (cargo !== "admin") {
    alert("Acesso restrito! Apenas o Administrador pode aceder a esta área.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      {/* Exibe a barra de navegação no topo de todas as páginas */}
      <Navbar />

      <Routes>
        {/* Telas Iniciais e Autenticação */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Telas Principais da Aplicação */}
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reader" element={<Reader />} />
        <Route path="/reader/:id" element={<Reader />} />
        <Route path="/add-book" element={<AddBook />} />

        {/* Dashboard Protegido para usuários comuns/autenticados */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Telas de Detalhes Dinâmicas */}
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/comments/:id" element={<Comments />} />
        
        {/* Painel Administrativo Protegido */}
        <Route 
          path="/admin" 
          element={
            <RotaAdminProtegida>
              <AdminPanel />
            </RotaAdminProtegida>
          } 
        />

        {/* Redirecionamento padrão caso a rota não exista */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
