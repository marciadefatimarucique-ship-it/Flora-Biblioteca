
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Conta criada com sucesso!");

        // Guardar dados no localStorage
        localStorage.setItem("userRole", "leitor");
        localStorage.setItem("nomeUsuario", data.usuario.nome);
        localStorage.setItem("emailUsuario", data.usuario.email);

        navigate("/login");
      } else {
        alert(data.message || "Erro ao criar conta.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao conectar com o servidor. Verifique se o backend está ligado.");
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

        <form onSubmit={handleRegister} className="space-y-4 text-left">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">
              Nome Completo:
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1">
              Nome de Utilizador:
            </label>
            <input
              type="text"
              name="usuario"
              placeholder="Escolha um utilizador"
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
            {loading ? "Cadastrando..." : "Concluir"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 font-normal">
          Já tem uma conta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#db2777] hover:text-[#be185d] font-bold underline transition"
          >
            Faça Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      )

      alert(response.data.message)

      navigate("/login")

    } catch (error) {

      alert(error.response.data.message)

    }
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-pink-700 text-center mb-8">
          Criar Conta
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="username"
            placeholder="Usuário"
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
            className="w-full border border-pink-200 rounded-xl px-4 py-3"
          />

          <button className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700">

            Criar Conta

          </button>

        </form>

        <p className="text-center mt-6">

          Já possui conta?

          <Link
            to="/login"
            className="text-pink-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Register

