<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Catalog() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/books";
  const UPLOADS_URL = "http://localhost:5000/uploads"; // ✅ URL base dos uploads

  const [livros, setLivros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [loading, setLoading] = useState(true);

  const categorias = ["Todas", "Ficção", "Romance", "Terror", "Biografia", "História"];

  useEffect(() => {
    const carregarAcervo = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const dados = await response.json();
          console.log("Livros carregados:", dados); // ✅ Debug
          setLivros(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarAcervo();
  }, []);

  const livrosFiltrados = livros.filter((livro) => {
    const termo = pesquisa.toLowerCase();
    const combinaTexto =
      (livro.titulo?.toLowerCase() || "").includes(termo) ||
      (livro.autor?.toLowerCase() || "").includes(termo);
    const combinaCategoria =
      categoriaAtiva === "Todas" || livro.categoria === categoriaAtiva;
    return combinaTexto && combinaCategoria;
  });

  // ✅ FUNÇÃO CORRIGIDA: URL da capa
  const getCapaUrl = (capa) => {
    if (!capa || capa === "") return null;
    if (capa.startsWith("http")) return capa;
    const caminho = capa.replace(/^uploads\//, "");
    return `${UPLOADS_URL}/${caminho}`;
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-gray-700 p-6 flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col">
        {/* Barra Superior */}
        <div className="w-full flex justify-between items-center mb-10">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-5 py-1.5 bg-white hover:bg-gray-50 text-gray-600 font-semibold rounded-xl border border-gray-200 shadow-sm transition duration-200 text-sm"
          >
            ← Voltar ao Menu
          </button>

          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-lg">
            📚 {livrosFiltrados.length} livros
          </span>
        </div>

        {/* Cabeçalho */}
        <header className="w-full text-center flex flex-col items-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-[#db2777] tracking-tight mb-3">
            Catálogo de Livros
          </h1>
        </header>

        {/* Filtros */}
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 mb-12 bg-white p-5 rounded-2xl border border-gray-100 shadow-md">
          <div className="flex w-full border border-gray-200 rounded-xl bg-gray-50 overflow-hidden shadow-inner focus-within:bg-white focus-within:border-pink-400 transition">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-transparent focus:outline-none placeholder-gray-400 text-gray-700 font-medium"
            />
            <span className="flex items-center pr-4 text-gray-400 text-sm">🔍</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition duration-200 border ${
                  categoriaAtiva === cat
                    ? "bg-[#db2777] text-white border-[#db2777]"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-pink-50 hover:text-[#db2777]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Livros */}
        <main className="w-full">
          {loading ? (
            <p className="text-center text-[#db2777] font-bold animate-pulse py-16">
              Carregando...
            </p>
          ) : livrosFiltrados.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400">Nenhum livro encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 justify-center">
              {livrosFiltrados.map((livro) => {
                const currentId = livro._id || livro.id;
                const capaUrl = getCapaUrl(livro.capa);

                return (
                  <div
                    key={currentId}
                    onClick={() => navigate(`/book/${currentId}`)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className="w-full aspect-[3/4] max-w-[145px] bg-white border border-gray-100 rounded-2xl p-1.5 shadow-md transition transform group-hover:scale-105 group-hover:shadow-xl group-hover:border-pink-300 flex items-center justify-center overflow-hidden">
                      {capaUrl ? (
                        <img
                          src={capaUrl}
                          alt={livro.titulo}
                          className="w-full h-full object-cover rounded-xl"
                          onError={(e) => {
                            console.error("Erro imagem:", capaUrl);
                            e.target.style.display = "none";
                            const fallback = document.createElement("div");
                            fallback.className = "w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-[10px] font-bold uppercase p-2 text-center rounded-xl";
                            fallback.textContent = livro.titulo;
                            e.target.parentElement.appendChild(fallback);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-[10px] font-bold uppercase p-2 text-center rounded-xl">
                          {livro.titulo}
                        </div>
                      )}
                    </div>

                    <div className="text-center mt-3 max-w-[135px]">
                      <p className="text-xs font-bold text-gray-800 group-hover:text-[#db2777] line-clamp-2">
                        {livro.titulo}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate">
                        {livro.autor}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Catalog;
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

