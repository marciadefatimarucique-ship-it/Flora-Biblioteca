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