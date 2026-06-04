import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/auth/login";

  const [formData, setFormData] = useState({ usuario: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErro("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");

    // LOGIN ADMIN especial (sem conta na BD)
    if (formData.usuario.trim() === "" && formData.senha === "ADMIN123") {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("nomeUsuario", "Administrador");
      localStorage.setItem("emailUsuario", "admin@flora.com");
      localStorage.setItem("token", "admin-token-local");
      setLoading(false);
      navigate("/admin");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token JWT e dados do utilizador
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.usuario.role || "leitor");
        localStorage.setItem("nomeUsuario", data.usuario.nome);
        localStorage.setItem("emailUsuario", data.usuario.email);
        localStorage.setItem("userId", data.usuario.id);

        setSucesso("Login efetuado com sucesso!");
        setTimeout(() => {
          if (data.usuario.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }, 800);
      } else {
        setErro(data.message || "Utilizador ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      setErro("Erro de conexão com o servidor. Verifique se o backend está ligado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-gray-700 p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center">
        <h1 className="text-3xl font-black text-[#db2777] mb-2 tracking-tight">
          Flora Biblioteca
        </h1>
        <p className="text-gray-400 text-xs mb-8 font-light">
          Insira as suas credenciais para entrar.
        </p>

        {/* Mensagens de feedback */}
        {erro && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium">
            ⚠️ {erro}
          </div>
        )}
        {sucesso && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl font-medium">
            ✅ {sucesso}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">
              Utilizador:
            </label>
            <input
              type="text"
              name="usuario"
              placeholder="Nome de utilizador"
              value={formData.usuario}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">Senha:</label>
            <input
              type="password"
              name="senha"
              placeholder="Introduza a sua senha"
              value={formData.senha}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#db2777] hover:bg-[#be185d] disabled:bg-gray-300 text-white font-bold rounded-xl shadow-md transition duration-200 text-sm tracking-wide"
            >
              {loading ? "A autenticar..." : "Entrar"}
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-500 mt-6 font-normal">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-[#db2777] hover:text-[#be185d] font-bold underline transition">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
