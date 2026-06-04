import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const API_URL = "http://localhost:5000/api/books";
  const UPLOADS_URL = "http://localhost:5000/uploads";
  const navigate = useNavigate();

  const [livros, setLivros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [loading, setLoading] = useState(true);

  const nomeUsuario = localStorage.getItem("nomeUsuario") || "Leitor";
  const userRole = localStorage.getItem("userRole");
  const listaCategorias = ["Todas", "Ficção", "Romance", "Terror", "Biografia", "História"];

  const buscarLivros = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const dados = await response.json();
        setLivros(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { buscarLivros(); }, []);

  // Registar leitura quando o utilizador clica num livro
  const handleAbrirLivro = async (livroId) => {
    const token = localStorage.getItem("token");
    if (token && token !== "admin-token-local") {
      try {
        await fetch("http://localhost:5000/api/usuarios/marcar-leitura", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ livroId }),
        });
      } catch {
        // Silencioso — não bloquear navegação por erro de registo
      }
    }
    navigate(`/book/${livroId}`);
  };

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

  const getCapaUrl = (capa) => {
    if (!capa || capa === "") return null;
    if (capa.startsWith("http")) return capa;
    return `${UPLOADS_URL}/${capa.replace(/^uploads\//, "")}`;
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-gray-700 p-6 flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col">

        {/* Barra superior */}
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 font-medium">
            Olá, <span className="font-black text-[#db2777]">{nomeUsuario}</span> 👋
          </span>
          <div className="flex gap-2">
            {userRole === "admin" && (
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="px-4 py-1.5 bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                ⚙️ Painel Admin
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("nomeUsuario");
                localStorage.removeItem("emailUsuario");
                localStorage.removeItem("userId");
                navigate("/login");
              }}
              className="px-4 py-1.5 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 shadow-sm transition"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Cabeçalho */}
        <header className="w-full text-center flex flex-col items-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-[#db2777] tracking-tight mb-4 drop-shadow-sm">
            Flora Biblioteca
          </h1>
          <p className="text-gray-600 text-sm font-semibold mb-8">
            Descubra histórias que inspiram
          </p>

          {/* Barra de ferramentas */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-4xl bg-white p-4 rounded-2xl border border-gray-100 shadow-md">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 bg-transparent hover:bg-pink-50 text-[#db2777] font-bold rounded-xl border border-pink-200 transition text-sm w-full md:w-auto min-w-28 shadow-sm"
            >
              👤 Perfil
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
                onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); buscarLivros(); }}
                className="px-6 py-2 bg-transparent hover:bg-pink-50 text-[#db2777] font-bold rounded-xl border border-pink-200 transition text-sm min-w-24 shadow-sm"
              >
                🔄 Início
              </button>

              <button
                type="button"
                onClick={() => navigate("/catalog")}
                className="px-6 py-2 bg-transparent hover:bg-pink-50 text-[#db2777] font-bold rounded-xl border border-pink-200 transition text-sm min-w-24 shadow-sm"
              >
                📚 Livros
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

        {/* Conteúdo principal */}
        <main className="w-full pb-16">
          <div className="text-center mb-10">
            <h3 className="text-sm font-extrabold text-[#db2777] tracking-widest uppercase border-b-2 border-pink-100 pb-2 inline-block px-8">
              Livros em Destaque
            </h3>
          </div>

          {loading ? (
            <p className="text-center text-[#db2777] font-bold animate-pulse py-12">A carregar livros...</p>
          ) : livrosFiltrados.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm font-medium">Nenhum livro encontrado.</p>
          ) : (
            <div className="space-y-16">
              {categoriasExibidas.map((cat) => {
                const livrosDaCategoria = livrosFiltrados.filter((l) => l.categoria === cat);
                if (livrosDaCategoria.length === 0) return null;
                return (
                  <div key={cat} className="pt-2">
                    <h4 className="text-xs font-black text-gray-400 text-center mb-8 tracking-widest uppercase">
                      — {cat} —
                    </h4>
                    <div className="flex flex-wrap gap-8 justify-center items-start">
                      {livrosDaCategoria.map((livro) => {
                        const currentId = livro._id || livro.id;
                        const capaUrl = getCapaUrl(livro.capa);
                        return (
                          <div
                            key={currentId}
                            onClick={() => handleAbrirLivro(currentId)}
                            className="flex flex-col items-center group cursor-pointer w-36"
                          >
                            <div className="w-32 h-44 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-md transition transform group-hover:scale-105 group-hover:shadow-xl group-hover:border-pink-300 flex items-center justify-center overflow-hidden">
                              {capaUrl ? (
                                <img
                                  src={capaUrl}
                                  alt={`Capa de ${livro.titulo}`}
                                  className="w-full h-full object-cover rounded-xl"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-[10px] font-bold uppercase p-2 text-center rounded-xl">${livro.titulo}</div>`;
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-[10px] font-bold uppercase p-2 text-center rounded-xl">
                                  {livro.titulo}
                                </div>
                              )}
                            </div>
                            <p className="text-xs font-bold text-gray-600 text-center mt-3 group-hover:text-[#db2777] line-clamp-2 max-w-[120px] tracking-tight transition">
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
