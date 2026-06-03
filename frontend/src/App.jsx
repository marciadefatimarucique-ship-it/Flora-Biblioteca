<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
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


const RotaAdminProtegida = ({ children }) => {
  const cargo = localStorage.getItem("userRole");
  // Se não for admin, bloqueia o acesso e joga de volta para o login
  if (cargo !== "admin") {
    alert("Acesso restrito! Apenas o Administrador pode aceder a esta área.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* Telas Iniciais e Autenticação */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Telas Principais da Aplicação */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reader" element={<Reader />} />
      <Route path="/reader/:id" element={<Reader />} /> {/* 

      {/* Telas de Detalhes Dinâmicas */}
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/comments/:id" element={<Comments />} />
      
      {/* Painel Administrativo */}
      <Route path="/admin" element={<AdminPanel />} />
       <Route 
        path="/admin" 
        element={
          <RotaAdminProtegida>
            <AdminPanel />
          </RotaAdminProtegida>
        } 
      />
    </Routes>
   
  );
}

export default App;
=======
import { Routes, Route } from "react-router-dom"
import Catalog from "./pages/Catalog"
import AddBook from "./pages/AddBook"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (

   <>
  <Navbar />

  <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/catalog" element={<Catalog />} />

      <Route path="/add-book" element={<AddBook />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
</>

  )
}

export default App
>>>>>>> cd4434f4efb6a48be7c5eb8713229f3d55739bca
