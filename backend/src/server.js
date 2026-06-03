const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SERVIR FICHEIROS ESTÁTICOS - caminho absoluto
const uploadsDir = path.resolve(__dirname, "uploads");
console.log("========================================");
console.log("📂 __dirname:", __dirname);
console.log("📂 uploadsDir:", uploadsDir);
console.log("📂 Existe?", fs.existsSync(uploadsDir));

if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir);
  console.log("📁 Ficheiros:", files.length);
  files.forEach(f => console.log("   📄", f));
} else {
  console.log("❌ Pasta não existe! Criando...");
  fs.mkdirSync(uploadsDir, { recursive: true });
}
console.log("========================================");

// ✅ Middleware para log de requests a /uploads
app.use("/uploads", (req, res, next) => {
  console.log("📥 Request para:", req.url);
  console.log("📥 Caminho completo:", path.join(uploadsDir, req.url));
  console.log("📥 Existe?", fs.existsSync(path.join(uploadsDir, req.url)));
  next();
}, express.static(uploadsDir));

// Rotas API
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Flora Biblioteca funcionando");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.log("❌ Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});