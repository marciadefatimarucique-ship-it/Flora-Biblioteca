import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  const nomeUsuario = localStorage.getItem("nomeUsuario");
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!(token && nomeUsuario);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("userId");
    setMenuAberto(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
      {/* Logo */}
      <Link
        to={isLoggedIn ? "/dashboard" : "/"}
        className="text-xl font-black text-[#db2777] tracking-tight"
      >
        📚 Flora Biblioteca
      </Link>

      {/* Links Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/catalog"
          className={`text-sm font-semibold transition ${isActive("/catalog") ? "text-[#db2777]" : "text-gray-600 hover:text-[#db2777]"}`}
        >
          Catálogo
        </Link>

        {isLoggedIn && (
          <Link
            to="/dashboard"
            className={`text-sm font-semibold transition ${isActive("/dashboard") ? "text-[#db2777]" : "text-gray-600 hover:text-[#db2777]"}`}
          >
            Início
          </Link>
        )}

        {isLoggedIn && userRole === "admin" && (
          <Link
            to="/admin"
            className={`text-sm font-semibold transition ${isActive("/admin") ? "text-[#db2777]" : "text-gray-600 hover:text-[#db2777]"}`}
          >
            ⚙️ Admin
          </Link>
        )}

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-pink-50 text-[#db2777] px-4 py-1.5 rounded-full text-sm font-bold hover:bg-pink-100 transition"
            >
              <span className="w-6 h-6 bg-[#db2777] text-white rounded-full flex items-center justify-center text-xs font-black uppercase">
                {nomeUsuario?.charAt(0) || "U"}
              </span>
              {nomeUsuario}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-4 py-1.5 rounded-full text-sm font-bold transition border border-gray-200 hover:border-red-200"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-600 hover:text-[#db2777] transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#db2777] hover:bg-[#be185d] text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm"
            >
              Cadastro
            </Link>
          </div>
        )}
      </div>

      {/* Botão menu hambúrguer (mobile) */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${menuAberto ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${menuAberto ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${menuAberto ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Menu mobile dropdown */}
      {menuAberto && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg md:hidden flex flex-col p-4 gap-3 z-50">
          <Link to="/catalog" className="text-sm font-semibold text-gray-700 hover:text-[#db2777] py-2 border-b border-gray-50" onClick={() => setMenuAberto(false)}>Catálogo</Link>
          {isLoggedIn && <Link to="/dashboard" className="text-sm font-semibold text-gray-700 hover:text-[#db2777] py-2 border-b border-gray-50" onClick={() => setMenuAberto(false)}>Início</Link>}
          {isLoggedIn && <Link to="/profile" className="text-sm font-semibold text-gray-700 hover:text-[#db2777] py-2 border-b border-gray-50" onClick={() => setMenuAberto(false)}>Perfil</Link>}
          {isLoggedIn && userRole === "admin" && <Link to="/admin" className="text-sm font-semibold text-[#db2777] py-2 border-b border-gray-50" onClick={() => setMenuAberto(false)}>⚙️ Admin</Link>}
          {isLoggedIn
            ? <button onClick={handleLogout} className="text-sm font-bold text-red-500 text-left py-2">Sair</button>
            : <>
                <Link to="/login" className="text-sm font-semibold text-gray-700 py-2" onClick={() => setMenuAberto(false)}>Login</Link>
                <Link to="/register" className="bg-[#db2777] text-white text-sm font-bold px-4 py-2 rounded-xl text-center" onClick={() => setMenuAberto(false)}>Cadastro</Link>
              </>
          }
        </div>
      )}
    </nav>
  );
}

export default Navbar;