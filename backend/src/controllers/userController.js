const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET /api/usuarios/total — Total de utilizadores (admin)
const getTotalUsuarios = async (req, res) => {
  try {
    const total = await User.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Erro ao contar utilizadores." });
  }
};

// PUT /api/usuarios/alterar-senha — Alterar senha do utilizador autenticado
const alterarSenha = async (req, res) => {
  try {
    const { novaSenha } = req.body;

    if (!novaSenha || novaSenha.length < 6) {
      return res.status(400).json({ message: "A nova senha deve ter no mínimo 6 caracteres." });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaEncriptada = await bcrypt.hash(novaSenha, salt);

    await User.findByIdAndUpdate(req.user._id, { senha: senhaEncriptada });

    res.status(200).json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    res.status(500).json({ message: "Erro interno ao alterar senha." });
  }
};

// GET /api/usuarios/historico — Histórico de leituras do utilizador autenticado
const getHistorico = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("livrosLidos", "titulo autor categoria");
    res.status(200).json(user.livrosLidos || []);
  } catch (error) {
    res.status(500).json({ message: "Erro ao carregar histórico." });
  }
};

// POST /api/usuarios/marcar-leitura — Registar leitura de um livro
const marcarLeitura = async (req, res) => {
  try {
    const { livroId } = req.body;
    if (!livroId) {
      return res.status(400).json({ message: "livroId é obrigatório." });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { livrosLidos: livroId } }, // $addToSet evita duplicados
      { new: true }
    );

    res.status(200).json({ message: "Leitura registada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registar leitura." });
  }
};

module.exports = { getTotalUsuarios, alterarSenha, getHistorico, marcarLeitura };
