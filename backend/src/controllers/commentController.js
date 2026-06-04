const Comment = require("../models/Comment");

// GET /api/comentarios/:livroId — Listar comentários de um livro
const getComentarios = async (req, res) => {
  try {
    const comentarios = await Comment.find({ livroId: req.params.livroId })
      .sort({ createdAt: -1 });
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: "Erro ao carregar comentários." });
  }
};

// POST /api/comentarios/:livroId — Adicionar comentário a um livro
const addComentario = async (req, res) => {
  try {
    const { nomeAutor, texto } = req.body;

    if (!texto || texto.trim() === "") {
      return res.status(400).json({ message: "O comentário não pode estar vazio." });
    }

    const novoComentario = await Comment.create({
      livroId: req.params.livroId,
      nomeAutor: nomeAutor?.trim() || "Anónimo",
      texto: texto.trim(),
    });

    res.status(201).json(novoComentario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao guardar comentário." });
  }
};

// DELETE /api/comentarios/:id — Remover comentário (admin)
const deleteComentario = async (req, res) => {
  try {
    const comentario = await Comment.findByIdAndDelete(req.params.id);
    if (!comentario) {
      return res.status(404).json({ message: "Comentário não encontrado." });
    }
    res.status(200).json({ message: "Comentário removido." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover comentário." });
  }
};

module.exports = { getComentarios, addComentario, deleteComentario };
