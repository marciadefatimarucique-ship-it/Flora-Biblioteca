function Comments() {
  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-pink-700">
        Comentários
      </h1>

      <textarea
        className="w-full border rounded-xl p-4 mt-6"
      />

      <button className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-xl">
        Enviar
      </button>
    </div>
  )
}

export default Comments