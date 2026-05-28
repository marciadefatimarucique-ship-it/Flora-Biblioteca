import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
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

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      localStorage.setItem("token", data.token)

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )

      alert("Login realizado com sucesso")

      navigate("/dashboard")

    } catch (error) {

      console.log(error)
alert(error.message)

    }

  }

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-100">

        <h1 className="text-4xl font-bold text-pink-700 text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="username"
            placeholder="Usuário"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <button className="w-full bg-pink-600 text-white py-3 rounded-xl">

            Entrar

          </button>

        </form>

        <p className="text-center mt-6">

          Nao possui uma conta?

          <Link
            to="/register"
            className="text-pink-600 ml-2"
          >
            Cadastro
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Login