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