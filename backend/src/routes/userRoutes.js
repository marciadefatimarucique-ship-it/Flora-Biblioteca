const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const {
  getTotalUsuarios,
  alterarSenha,
  getHistorico,
  marcarLeitura,
} = require("../controllers/userController");

// Rotas protegidas por autenticação
router.put("/alterar-senha", authMiddleware, alterarSenha);
router.get("/historico", authMiddleware, getHistorico);
router.post("/marcar-leitura", authMiddleware, marcarLeitura);

// Rota protegida por admin
router.get("/total", authMiddleware, adminMiddleware, getTotalUsuarios);

module.exports = router;
