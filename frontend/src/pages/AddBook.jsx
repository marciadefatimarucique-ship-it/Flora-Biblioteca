import { useState } from "react"

function AddBook() {

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: ""
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(
        "https://flora-biblioteca-1.onrender.com/api/books",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      alert(data.message)

      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        image: ""
      })

    } catch (error) {

      alert("Erro ao adicionar livro")

    }

  }

  return (

    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-10">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-pink-700 mb-8 text-center">
          Adicionar Livro
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={formData.author}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl h-32"
          />

          <input
            type="text"
            name="image"
            placeholder="URL da imagem"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          <button className="w-full bg-pink-600 text-white py-4 rounded-xl text-lg">

            Adicionar Livro

          </button>

        </form>

      </div>

    </div>

  )
}

export default AddBook
