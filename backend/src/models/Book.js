const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  titulo:   { type: String, required: true },
  autor:    { type: String, required: true },
  categoria:{ type: String, required: true },
  resumo:   { type: String, default: "" },
  capa:     { type: String, default: "" },
  pdf:      { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);
