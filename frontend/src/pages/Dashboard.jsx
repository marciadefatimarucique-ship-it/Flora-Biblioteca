import { useNavigate } from "react-router-dom"

function Dashboard() {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    navigate("/login")

  }

  return (

    <div className="min-h-screen bg-pink-50 p-10">

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-bold text-pink-700">

          Bem-vinda, {user?.name}

        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-xl"
        >

          Logout

        </button>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-pink-700 mb-4">
          Dashboard
        </h2>

        <p className="text-gray-700 text-lg">
          Sistema da Flora Biblioteca Digital funcionando com autenticação real.
        </p>

      </div>

    </div>

  )
}

export default Dashboard