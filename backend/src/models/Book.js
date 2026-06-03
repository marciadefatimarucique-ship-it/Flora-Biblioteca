<<<<<<< HEAD
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: { type: String, required: true },
  resumo: { type: String },
  capa: { type: String, default: "" },
  pdf: { type: String, default: "" },
});

module.exports = mongoose.model("Book", BookSchema);

const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  image: {
    type: String
  }

})

module.exports = mongoose.model("Book", BookSchema)

