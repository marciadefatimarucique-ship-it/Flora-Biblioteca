import { Link, useNavigate } from "react-router-dom"

function Navbar() {

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

    <nav className="bg-white shadow-md px-10 py-5 flex items-center justify-between">

      <Link
        to="/"
        className="text-3xl font-bold text-pink-700"
      >

        Flora Biblioteca

      </Link>

      <div className="flex items-center gap-6">

        <Link
          to="/catalog"
          className="text-gray-700 hover:text-pink-600"
        >
          Catálogo
        </Link>

        <Link
          to="/add-book"
          className="text-gray-700 hover:text-pink-600"
        >
          Adicionar Livro
        </Link>

        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-pink-600"
        >
          Dashboard
        </Link>

        {user ? (

          <>
            <span className="text-pink-700 font-semibold">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-xl"
            >

              Logout

            </button>
          </>

        ) : (

          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-pink-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-pink-600 text-white px-5 py-2 rounded-xl"
            >
              Cadastro
            </Link>
          </>

        )}

      </div>

    </nav>

  )
}

export default Navbar