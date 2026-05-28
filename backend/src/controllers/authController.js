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