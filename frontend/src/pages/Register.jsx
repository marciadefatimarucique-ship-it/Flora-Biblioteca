import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/auth/register";

  const [formData, setFormData] = useState({
    nome: "",
    usuario: "",
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErro("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");

    if (formData.senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      setLoading(false);
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
        // Auto-login após registo
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.usuario.role || "leitor");
        localStorage.setItem("nomeUsuario", data.usuario.nome);
        localStorage.setItem("emailUsuario", data.usuario.email);
        localStorage.setItem("userId", data.usuario.id);

        setSucesso("Conta criada com sucesso! A entrar...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setErro(data.message || "Erro ao criar conta.");
      }
    } catch (error) {
      console.error("Erro ao registar:", error);
      setErro("Erro ao conectar com o servidor. Verifique se o backend está ligado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-gray-700 p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center">
        <h1 className="text-3xl font-black text-[#db2777] mb-2 tracking-tight">
          Criar Conta
        </h1>
        <p className="text-gray-400 text-xs mb-6 font-light">
          Junte-se à Flora Biblioteca Digital.
        </p>

        {/* Feedback inline */}
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

        <form onSubmit={handleRegister} className="space-y-4 text-left">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">Nome Completo:</label>
            <input
              type="text"
              name="nome"
              placeholder="O seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">Nome de Utilizador:</label>
            <input
              type="text"
              name="usuario"
              placeholder="Escolha um utilizador único"
              value={formData.usuario}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="seuemail@provedor.com"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">Senha:</label>
            <input
              type="password"
              name="senha"
              placeholder="Mínimo 6 caracteres"
              value={formData.senha}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#db2777] hover:bg-[#be185d] disabled:bg-gray-300 text-white font-bold rounded-xl transition text-sm"
          >
            {loading ? "A criar conta..." : "Concluir"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 font-normal">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-[#db2777] hover:text-[#be185d] font-bold underline transition">
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
