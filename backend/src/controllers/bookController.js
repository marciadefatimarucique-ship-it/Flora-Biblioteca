
const Book = require("../models/Book");

const getBookById = async (req, res) => {
  try {
    const livro = await Book.findById(req.params.id);
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const livrosNormalizados = books.map((book) => ({
      _id: book._id,
      titulo: book.titulo || book.title || "Sem título",
      autor: book.autor || book.author || "Desconhecido",
      categoria: book.categoria || book.category || "Ficção",
      resumo: book.resumo || book.description || "",
      capa: book.capa || book.image || "",
      pdf: book.pdf || "",
    }));
    res.status(200).json(livrosNormalizados);
  } catch (error) {
    console.error("Erro ao listar livros:", error);
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const livro = await Book.create({
      titulo: req.body.titulo,
      autor: req.body.autor,
      categoria: req.body.categoria,
      resumo: req.body.resumo,
      capa: req.files?.capa?.[0]?.filename || "",
      pdf: req.files?.pdf?.[0]?.filename || "",
    });
    res.status(201).json(livro);
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const dados = {
      titulo: req.body.titulo,
      autor: req.body.autor,
      categoria: req.body.categoria,
      resumo: req.body.resumo,
    };
    if (req.files?.capa) {
      dados.capa = req.files.capa[0].filename;
    }
    if (req.files?.pdf) {
      dados.pdf = req.files.pdf[0].filename;
    }
    const livro = await Book.findByIdAndUpdate(req.params.id, dados, { new: true });
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.json(livro);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const livro = await Book.findByIdAndDelete(req.params.id);
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.json({ message: "Livro removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover livro:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
const Book = require("../models/Book")

// ADD BOOK
exports.addBook = async (req, res) => {

  try {

    const book = await Book.create(req.body)

    res.status(201).json({
      message: "Livro adicionado",
      book
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// GET BOOKS
exports.getBooks = async (req, res) => {

  try {

    const books = await Book.find()

    res.status(200).json(books)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

