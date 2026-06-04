const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  livroId:    { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  nomeAutor:  { type: String, required: true, default: "Anónimo" },
  texto:      { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
