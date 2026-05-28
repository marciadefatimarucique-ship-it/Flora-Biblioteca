function BookCard({ title, category }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300 cursor-pointer">

      <div className="h-64 bg-pink-200 flex items-center justify-center">

        <span className="text-pink-700 font-bold text-xl">
          Capa
        </span>

      </div>

      <div className="p-4">

        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="text-pink-600 mt-2">
          {category}
        </p>

      </div>

    </div>
  )
}

export default BookCard