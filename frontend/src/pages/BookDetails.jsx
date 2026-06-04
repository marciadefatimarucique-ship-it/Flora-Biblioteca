import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "./Comments";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const API_URL = `https://flora-biblioteca-1.onrender.com/api/books/${id}`;
  const UPLOADS_URL = "https://flora-biblioteca-1.onrender.com/uploads";

  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  useEffect(() => {
    const buscarLivro = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const dados = await response.json();
          setLivro(dados);
        } else {
          console.error("Livro não encontrado na API");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      buscarLivro();
    }
  }, [id, API_URL]);

  // ✅ FUNÇÃO AUXILIAR: URL da capa
  const getCapaUrl = (capa) => {
    if (!capa || capa === "") return null;
    if (capa.startsWith("http")) return capa;
    const caminho = capa.replace(/^uploads\//, "");
    return `${UPLOADS_URL}/${caminho}`;
  };

  // ✅ FUNÇÃO AUXILIAR: URL do PDF
  const getPdfUrl = (pdf) => {
    if (!pdf || pdf === "") return null;
    if (pdf.startsWith("http")) return pdf;
    const caminho = pdf.replace(/^uploads\//, "");
    return `${UPLOADS_URL}/${caminho}`;
  };

  // ✅ APENAS UMA FUNÇÃO handleLer
  const handleLer = () => {
    if (livro && livro.pdf) {
      navigate(`/reader/${id}`); // Navega para o Reader
    } else {
      alert("Arquivo PDF não disponível.");
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfbfa] flex items-center justify-center font-sans">
        <p className="text-[#d11a5f] font-bold text-2xl animate-pulse tracking-wide">
          Carregando livro...
        </p>
      </div>
    );
  }

  if (!livro) {
    return (
      <div className="min-h-screen bg-[#fcfbfa] flex flex-col items-center justify-center font-sans">
        <p className="text-gray-900 text-xl font-medium mb-4">Livro não localizado.</p>
        <button
          onClick={handleVoltar}
          className="bg-[#d11a5f] text-white px-6 py-2 rounded-2xl font-bold hover:bg-[#b0104b] transition"
        >
          Voltar
        </button>
      </div>
    );
  }

  const capaUrl = getCapaUrl(livro.capa);

  return (
    <div className="min-h-screen bg-[#f7f4ed] p-6 flex flex-col items-center justify-center font-sans selection:bg-[#d11a5f]/20">
      <div className="w-full max-w-2xl text-center flex flex-col items-center">
        {/* Título */}
        <h1 className="text-4xl sm:text-3xl font-black text-[#d11a5f] tracking-tight mb-3 drop-shadow-sm">
          {livro.titulo}
        </h1>

        {/* Autor e Categoria */}
        <p className="text-gray-900 text-lg sm:text-xl mb-8 font-medium">
          Por{" "}
          <span className="underline decoration-[#d11a5f] decoration-2">
            {livro.autor}
          </span>{" "}
          •{" "}
          <span className="italic text-gray-700 font-normal">
            {livro.categoria}
          </span>
        </p>

        {/* Capa */}
        <div className="w-56 h-80 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-white mb-8 transform transition hover:scale-105 duration-300">
          {capaUrl ? (
            <img
              src={capaUrl}
              alt={`Capa de ${livro.titulo}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Erro capa:", capaUrl);
                e.target.style.display = "none";
                const fallback = document.createElement("div");
                fallback.className = "w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-sm";
                fallback.textContent = "Sem Capa";
                e.target.parentElement.appendChild(fallback);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-sm">
              Sem Capa
            </div>
          )}
        </div>

        {/* Resumo */}
        <div className="w-full max-w-xl text-gray-900 text-base sm:text-lg leading-relaxed text-center font-normal px-4 mb-10 bg-white/40 p-6 rounded-2xl border border-gray-200/50 shadow-sm">
          {livro.resumo || "Sem resumo disponível."}
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md">
          <button
            type="button"
            onClick={handleLer}
            className="w-full sm:w-auto px-8 py-3 bg-[#d11a5f] hover:bg-[#b0104b] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition duration-200 min-w-48 text-center text-xl tracking-wide"
          >
            📖 Ler
          </button>

          <button
            type="button"
            onClick={() => setMostrarComentarios(!mostrarComentarios)}
            className="w-full sm:w-auto px-8 py-3 bg-transparent hover:bg-[#d11a5f]/10 text-[#d11a5f] font-bold rounded-xl border-2 border-[#d11a5f] transition duration-200 min-w-48 text-center text-xl tracking-wide"
          >
            {mostrarComentarios ? "💬 Fechar Chat" : "💬 Comentar"}
          </button>
        </div>

        {/* Voltar */}
        <button
          type="button"
          onClick={handleVoltar}
          className="text-sm text-gray-600 hover:text-black hover:underline font-bold tracking-widest uppercase mt-6 transition duration-200"
        >
          ← Voltar ao Menu
        </button>
      </div>

      {/* Comentários */}
      {mostrarComentarios && (
        <div className="w-full max-w-xl mt-12 bg-white border-2 border-gray-200 rounded-3xl shadow-2xl p-6">
          <h4 className="text-2xl font-black text-[#d11a5f] mb-4 border-b-2 border-gray-100 pb-2">
            Comentários dos Leitores
          </h4>
          <Comments livroId={id} />
        </div>
      )}
    </div>
  );
}

export default BookDetails;
