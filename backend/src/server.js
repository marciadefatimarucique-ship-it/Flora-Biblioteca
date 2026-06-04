const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:3000", 
    "https://flora-biblioteca-c6hw-85tdemvbe.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir ficheiros estáticos (capas e PDFs)
const uploadsDir = path.resolve(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Pasta uploads criada.");
}
app.use("/uploads", express.static(uploadsDir));

// Rotas API
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/comentarios", commentRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("✅ API Flora Biblioteca funcionando!");
});

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});