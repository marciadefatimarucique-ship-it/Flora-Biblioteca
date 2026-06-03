import { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/auth/login";

  const [formData, setFormData] = useState({ usuario: "", senha: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ADMIN: Apenas senha, sem utilizador
    if (formData.usuario.trim() === "" && formData.senha === "ADMIN123") {
      alert("Acesso Administrativo Concedido!");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("nomeUsuario", "Administrador");
      localStorage.setItem("emailUsuario", "admin@flora.com");
      setLoading(false);
      navigate("/admin");
      return;
    }

    // LOGIN NORMAL
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login efetuado com sucesso!");

        // Guardar dados no localStorage
        localStorage.setItem("userRole", data.usuario.role || "leitor");
        localStorage.setItem("nomeUsuario", data.usuario.nome);
        localStorage.setItem("emailUsuario", data.usuario.email);

        navigate("/dashboard");
      } else {
        alert(data.message || "Utilizador ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      alert("Erro de conexão com o servidor. Verifique se o backend está ligado.");
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
              {loading ? "Autenticando..." : "Entrar"}
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-500 mt-6 font-normal">
          Não tem uma conta?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#db2777] hover:text-[#be185d] font-bold underline transition"
          >
            Cadastre-se
          </button>
=======
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... seu código de login continua igual
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#fce7f3", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        width: "100%",
        maxWidth: "420px"
      }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          fontWeight: "bold", 
          color: "#db2777", 
          textAlign: "center",
          marginBottom: "32px" 
        }}>
          Login
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            value={formData.username}
            onChange={handleChange}
            style={{ padding: "14px", border: "1px solid #ddd", borderRadius: "12px", fontSize: "16px" }}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            style={{ padding: "14px", border: "1px solid #ddd", borderRadius: "12px", fontSize: "16px" }}
            required
          />

          <button
            type="submit"
            style={{
              padding: "14px",
              backgroundColor: "#db2777",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Entrar
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", color: "#666" }}>
          Não possui uma conta?{" "}
          <Link to="/register" style={{ color: "#db2777", fontWeight: "600" }}>
            Cadastre-se
          </Link>
>>>>>>> cd4434f4efb6a48be7c5eb8713229f3d55739bca
        </p>
      </div>
    </div>
  );
}

export default Login;