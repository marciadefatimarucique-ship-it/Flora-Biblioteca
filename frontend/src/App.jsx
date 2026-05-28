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