<<<<<<< HEAD
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ["leitor", "admin"], default: "leitor" },
});

module.exports = mongoose.model("User", UserSchema);
=======
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model("User", UserSchema)
>>>>>>> cd4434f4efb6a48be7c5eb8713229f3d55739bca
