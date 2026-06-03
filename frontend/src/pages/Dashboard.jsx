<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const API_URL = "http://localhost:5000/api/books";
  const UPLOADS_URL = "http://localhost:5000/uploads"; // ✅ URL base dos uploads
  const navigate = useNavigate();

  const [livros, setLivros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [loading, setLoading] = useState(true);

  const listaCategorias = ["Todas", "Ficção", "Romance", "Terror", "Biografia", "História"];

  const buscarLivros = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const dados = await response.json();
        console.log("Livros carregados:", dados); // ✅ Debug
        setLivros(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarLivros();
  }, []);

  const livrosFiltrados = livros.filter((livro) => {
    const termo = pesquisa.toLowerCase();
    const combinaTexto =
      (livro.titulo?.toLowerCase() || "").includes(termo) ||
      (livro.autor?.toLowerCase() || "").includes(termo);
    const combinaCategoria =
      categoriaFiltro === "Todas" || livro.categoria === categoriaFiltro;
    return combinaTexto && combinaCategoria;
  });

  const categoriasExibidas =
    categoriaFiltro === "Todas"
      ? [...new Set(livrosFiltrados.map((l) => l.categoria))]
      : [categoriaFiltro];

  // ✅ FUNÇÃO CORRIGIDA: URL da capa
  const getCapaUrl = (capa) => {
    if (!capa || capa === "") return null;
    if (capa.startsWith("http")) return capa;
    // Remove "uploads/" se já estiver no início
    const caminho = capa.replace(/^uploads\//, "");
    return `${UPLOADS_URL}/${caminho}`;
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-gray-700 p-6 flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col">
        {/* BOTÃO SAIR */}
        <div className="w-full flex justify-end mb-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-1 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 shadow-sm transition duration-200"
          >
            Sair
          </button>
        </div>

        {/* Cabeçalho */}
        <header className="w-full text-center flex flex-col items-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-[#db2777] tracking-tight mb-4 drop-shadow-sm">
            Flora Biblioteca
          </h1>
          <div className="text-gray-600 text-sm sm:text-base font-normal tracking-wide mb-8 max-w-2xl space-y-1">
            <p className="font-semibold text-gray-700">
              Descubra histórias que inspiram
            </p>
          </div>

          {/* Menu de Ferramentas */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-4xl bg-white p-4 rounded-2xl border border-gray-100 shadow-md">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 bg-transparent hover:bg-pink-50 text-[#db2777] font-bold rounded-xl border border-pink-200 transition duration-200 text-sm w-full md:w-auto min-w-28 shadow-sm"
            >
              Perfil
            </button>

            <div className="flex flex-1 w-full border border-gray-200 rounded-xl bg-gray-50 overflow-hidden shadow-inner focus-within:bg-white focus-within:border-pink-400 transition">
              <input
                type="text"
                placeholder="Pesquisar por títulos ou autores..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-transparent focus:outline-none placeholder-gray-400 text-gray-700 font-medium"
              />
              <span className="flex items-center pr-4 text-gray-400 text-sm">🔍</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  buscarLivros();
                }}
                className="px-6 py-2 bg-transparent hover:bg-pink-50 text-[#db2777] font-bold rounded-xl border border-pink-200 transition duration-200 text-sm min-w-24 shadow-sm"
              >
                🔄 Início
              </button>

              <button
                type="button"
                onClick={() => navigate("/catalog")}
                className="px-6 py-2 bg-transparent hover:bg-pink-50 text-[#db2777] font-bold rounded-xl border border-pink-200 transition duration-200 text-sm min-w-24 shadow-sm"
              >
                Livros
              </button>

              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="bg-white text-gray-700 border border-gray-200 text-sm py-2 px-3 rounded-xl shadow-sm focus:outline-none cursor-pointer focus:border-pink-400 transition min-w-32 w-full md:w-auto font-semibold"
              >
                {listaCategorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="w-full pb-16">
          <div className="text-center mb-10">
            <h3 className="text-sm font-extrabold text-[#db2777] tracking-widest uppercase border-b-2 border-pink-100 pb-2 inline-block px-8">
              Livros em Destaque
            </h3>
          </div>

          {loading ? (
            <p className="text-center text-[#db2777] font-bold animate-pulse py-12">
              Atualizando dados...
            </p>
          ) : livrosFiltrados.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm font-medium">
              Nenhum livro encontrado.
            </p>
          ) : (
            <div className="space-y-16">
              {categoriasExibidas.map((cat) => {
                const livrosDaCategoria = livrosFiltrados.filter((l) => l.categoria === cat);
                if (livrosDaCategoria.length === 0) return null;

                return (
                  <div key={cat} className="pt-2">
                    <h4 className="text-xs font-black text-gray-400 text-center mb-8 tracking-widest uppercase">
                      // {cat} //
                    </h4>

                    <div className="flex flex-wrap gap-8 justify-center items-start">
                      {livrosDaCategoria.map((livro) => {
                        const currentId = livro._id || livro.id;
                        const capaUrl = getCapaUrl(livro.capa);
                        
                        return (
                          <div
                            key={currentId}
                            onClick={() => navigate(`/book/${currentId}`)}
                            className="flex flex-col items-center group cursor-pointer w-36"
                          >
                            <div className="w-32 h-44 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-md transition transform group-hover:scale-105 group-hover:shadow-xl group-hover:border-pink-300 flex items-center justify-center overflow-hidden">
                              {capaUrl ? (
                                <img
                                  src={capaUrl}
                                  alt={`Capa de ${livro.titulo}`}
                                  className="w-full h-full object-cover rounded-xl"
                                  onError={(e) => {
                                    console.error("Erro ao carregar imagem:", capaUrl);
                                    e.target.onerror = null;
                                    e.target.src = "";
                                    e.target.style.display = "none";
                                    // Mostra fallback
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

                            <p className="text-xs font-bold text-gray-600 text-center mt-3 group-hover:text-[#db2777] line-clamp-2 max-w-[120px] tracking-tight transition duration-200">
                              {livro.titulo}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1 truncate max-w-[120px]">
                              {livro.autor}
                            </p>
                          </div>
                        );
                      })}
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

export default Dashboard;
=======
import { useNavigate } from "react-router-dom"

function Dashboard() {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    navigate("/login")

  }

  return (

    <div className="min-h-screen bg-pink-50 p-10">

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-bold text-pink-700">

          Bem-vinda, {user?.name}

        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-xl"
        >

          Logout

        </button>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-pink-700 mb-4">
          Dashboard
        </h2>

        <p className="text-gray-700 text-lg">
          Sistema da Flora Biblioteca Digital funcionando com autenticação real.
        </p>

      </div>

    </div>

  )
}

export default Dashboard
>>>>>>> cd4434f4efb6a48be7c5eb8713229f3d55739bca
