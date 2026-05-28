import { useEffect, useState } from "react"

function Catalog() {

  const [books, setBooks] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {

    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))

  }, [])

  const filteredBooks = books.filter((book) =>

    book.title.toLowerCase().includes(search.toLowerCase()) ||

    book.author.toLowerCase().includes(search.toLowerCase()) ||

    book.category.toLowerCase().includes(search.toLowerCase())

  )

  return (

    <div className="min-h-screen bg-pink-50 p-10">

      <h1 className="text-5xl font-bold text-pink-700 mb-8">
        Catálogo de Livros
      </h1>

      <input
        type="text"
        placeholder="Pesquisar livros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-10 p-4 rounded-2xl border border-pink-200 shadow-sm"
      />

      <div className="grid md:grid-cols-3 gap-8">

        {filteredBooks.map((book) => (

          <div
            key={book._id}
            className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 duration-300"
          >

            <img
              src={book.image}
              alt={book.title}
              className="w-full h-72 object-cover rounded-2xl mb-5"
            />

            <h2 className="text-2xl font-bold text-pink-700">
              {book.title}
            </h2>

            <p className="text-gray-700 mt-2">
              {book.author}
            </p>

            <p className="text-sm text-pink-600 mt-2">
              {book.category}
            </p>

            <p className="text-gray-500 mt-4">
              {book.description}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Catalog