const express = require("express");
const bookRoutes = require("./routes/bookRoutes")
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

// Rotas
app.use("/api/auth", require("./routes/authRoutes"));

// Rota de teste
app.get("/", (req, res) => {
  res.send("API Flora Biblioteca funcionando");
});

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch((err) => {
    console.log("Erro ao conectar no MongoDB:", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});