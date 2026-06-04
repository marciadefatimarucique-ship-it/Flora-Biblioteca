const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { getComentarios, addComentario, deleteComentario } = require("../controllers/commentController");

// Público: ver comentários de um livro
router.get("/:livroId", getComentarios);

// Público: adicionar comentário (qualquer visitante pode comentar)
router.post("/:livroId", addComentario);

// Admin: apagar comentário
router.delete("/:id", authMiddleware, adminMiddleware, deleteComentario);

module.exports = router;
