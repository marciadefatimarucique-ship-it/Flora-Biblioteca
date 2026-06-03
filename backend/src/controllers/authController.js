<<<<<<< HEAD
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTO
const register = async (req, res) => {
  try {
    const { nome, usuario, email, senha } = req.body;

    if (!nome || !usuario || !email || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    if (senha.length < 6) {
      return res.status(400).json({ message: "Senha deve ter no mínimo 6 caracteres" });
    }

    const usuarioExistente = await User.findOne({ usuario });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Nome de utilizador já existe" });
    }

    const emailExistente = await User.findOne({ email });
    if (emailExistente) {
      return res.status(400).json({ message: "Email já registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaEncriptada = await bcrypt.hash(senha, salt);

    const novoUsuario = await User.create({
      nome,
      usuario,
      email,
      senha: senhaEncriptada,
      role: "leitor",
    });

    res.status(201).json({
      message: "Conta criada com sucesso!",
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        usuario: novoUsuario.usuario,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ message: "Utilizador e senha são obrigatórios" });
    }

    const user = await User.findOne({ usuario });
    if (!user) {
      return res.status(400).json({ message: "Utilizador ou senha incorretos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ message: "Utilizador ou senha incorretos" });
    }

    res.status(200).json({
      message: "Login efetuado com sucesso!",
      usuario: {
        id: user._id,
        nome: user.nome,
        usuario: user.usuario,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { register, login };
=======
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
exports.register = async (req, res) => {

  try {

    const { name, email, username, password } = req.body

    const userExists = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (userExists) {
      return res.status(400).json({
        message: "Usuário já existe"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword
    })

    res.status(201).json({
      message: "Usuário criado com sucesso"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// LOGIN
exports.login = async (req, res) => {

  try {

    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({
        message: "Usuário não encontrado"
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(400).json({
        message: "Senha incorreta"
      })
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    )

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username
      }
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}
>>>>>>> cd4434f4efb6a48be7c5eb8713229f3d55739bca
