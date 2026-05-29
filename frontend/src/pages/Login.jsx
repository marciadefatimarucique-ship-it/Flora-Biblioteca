import { useState } from "react";
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
        </p>
      </div>
    </div>
  );
}

export default Login;