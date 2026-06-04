import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Reader() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID do livro da URL
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `http://localhost:5000/api/books/${id}`;
  const UPLOADS_URL = "http://localhost:5000/uploads";

  useEffect(() => {
    const buscarLivro = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const dados = await response.json();
          setLivro(dados);
        }
      } catch (error) {
        console.error("Erro ao buscar livro:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      buscarLivro();
    }
  }, [id, API_URL]);

  // Função para construir URL do PDF
  const getPdfUrl = (pdf) => {
    if (!pdf || pdf === "") return null;
    if (pdf.startsWith("http")) return pdf;
    const caminho = pdf.replace(/^uploads\//, "");
    return `${UPLOADS_URL}/${caminho}`;
  };

  const handleVoltar = () => {
    navigate(-1); // Volta para a página anterior
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <p className="text-pink-700 font-bold text-2xl animate-pulse">
          Carregando livro...
        </p>
      </div>
    );
  }

  if (!livro || !livro.pdf) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center">
        <p className="text-gray-700 text-xl mb-4">
          {!livro ? "Livro não encontrado." : "PDF não disponível para este livro."}
        </p>
        <button
          onClick={handleVoltar}
          className="bg-pink-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-pink-700 transition"
        >
          ← Voltar
        </button>
      </div>
    );
  }

  const pdfUrl = getPdfUrl(livro.pdf);

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md p-5 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-pink-700">
            📖 Leitor Digital
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {livro.titulo} — {livro.autor}
          </p>
        </div>
        <button
          onClick={handleVoltar}
          className="bg-pink-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-pink-700 transition"
        >
          ← Voltar
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-4 md:p-8">
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8">
          <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
            {livro.titulo}
          </h2>

          {/* PDF Viewer */}
          <div className="relative">
            <iframe
              title={`PDF: ${livro.titulo}`}
              src={pdfUrl}
              width="100%"
              height="700"
              className="rounded-xl border border-gray-200"
              type="application/pdf"
            />
          </div>

          {/* Info */}
          <div className="text-center mt-4 text-sm text-gray-500">
            <p>Categoria: <span className="font-bold text-pink-600">{livro.categoria}</span></p>
            <p className="mt-1">{livro.resumo}</p>
          </div>

          {/* Botões de navegação (decoração, iframe já tem controles nativos) */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleVoltar}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              ← Voltar ao Catálogo
            </button>
            <a
              href={pdfUrl}
              download={`${livro.titulo}.pdf`}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-bold transition inline-block"
            >
              ⬇ Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reader;