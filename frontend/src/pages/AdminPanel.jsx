import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Ícones SVG inline
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

function AdminPanel() {
  const API_URL = "http://localhost:5000/api/books";
  const navigate = useNavigate(); // ✅ APENAS UMA VEZ

  const [livros, setLivros] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(9);
  const [idEdicao, setIdEdicao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [livroRemovendo, setLivroRemovendo] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    categoria: "Ficção",
    resumo: "",
  });

  const [arquivos, setArquivos] = useState({
    capa: null,
    pdf: null,
  });

  const listaCategorias = ["Ficção", "Romance", "Terror", "Biografia", "História"];

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const response = await fetch(API_URL, { method: "GET" });
      if (response.ok) {
        const dados = await response.json();
        setLivros(dados);
      } else {
        console.error("Erro ao carregar:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, tipo) => {
    if (e.target.files?.[0]) {
      setArquivos({ ...arquivos, [tipo]: e.target.files[0] });
    }
  };

  const limparFormulario = () => {
    setFormData({ titulo: "", autor: "", categoria: "Ficção", resumo: "" });
    setArquivos({ capa: null, pdf: null });
    setIdEdicao(null);
  };

  const salvarLivro = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("titulo", formData.titulo);
    dataToSend.append("autor", formData.autor);
    dataToSend.append("categoria", formData.categoria);
    dataToSend.append("resumo", formData.resumo);
    if (arquivos.capa) dataToSend.append("capa", arquivos.capa);
    if (arquivos.pdf) dataToSend.append("pdf", arquivos.pdf);

    try {
      if (idEdicao) {
        const response = await fetch(`${API_URL}/${idEdicao}`, {
          method: "PUT",
          body: dataToSend,
        });
        if (response.ok) {
          alert("Livro editado com sucesso!");
          carregarDados();
          limparFormulario();
        }
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          body: dataToSend,
        });
        if (response.ok) {
          alert("Livro gravado com sucesso!");
          carregarDados();
          limparFormulario();
        }
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao conectar com o banco de dados.");
    }
  };

  const prepararEdicao = (livro) => {
    setIdEdicao(livro._id || livro.id);
    setFormData({
      titulo: livro.titulo || "",
      autor: livro.autor || "",
      categoria: livro.categoria || "",
      resumo: livro.resumo || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removerLivro = async (id) => {
    if (!window.confirm("Deseja realmente excluir este livro?")) return;
    setLivroRemovendo(id);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Livro removido!");
        carregarDados();
        if (idEdicao === id) limparFormulario();
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    } finally {
      setLivroRemovendo(null);
    }
  };

  const atualizarTelaCompleta = () => {
    window.location.reload();
  };

  const getCapaUrl = (capa) => {
    if (!capa) return null;
    if (capa.startsWith("http")) return capa;
    return `http://localhost:5000/uploads/${capa}`;
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-gray-700 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-[#db2777] tracking-tight mb-2">
            Flora Biblioteca
          </h1>
          <p className="text-gray-400 text-xs font-light">
            Painel Administrativo - Gestão de Acervo Digital
          </p>
        </div>

        {/* Indicadores */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-t border-gray-100 py-4 mb-6 text-sm">
          <div className="flex gap-6">
            <div className="font-medium text-gray-600">
              Total de Livros: <span className="font-bold text-gray-900">{livros.length}</span>
            </div>
            <div className="font-medium text-gray-600">
              Total de Utilizadores: <span className="font-bold text-gray-900">{totalUsuarios}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={carregarDados}
              disabled={carregando}
              className="text-xs text-gray-400 hover:text-[#db2777] font-bold transition disabled:opacity-50"
            >
              {carregando ? "⏳ Carregando..." : "🔄 Atualizar Totais"}
            </button>
            <button
              type="button"
              onClick={atualizarTelaCompleta}
              className="text-xs text-gray-400 hover:text-[#db2777] font-bold transition"
            >
              🔄 Atualizar Tela
            </button>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition"
          >
            ← Voltar ao Dashboard
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={salvarLivro} className="space-y-5 text-left">
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">
            {idEdicao ? "✏️ Editar Livro Selecionado:" : "➕ Adicionar Novo Livro:"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 mb-1">Título:</label>
              <input type="text" name="titulo" placeholder="Nome do livro" value={formData.titulo} onChange={handleChange} className="border border-gray-200 rounded-xl bg-gray-50/50 px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 mb-1">Autor:</label>
              <input type="text" name="autor" placeholder="Nome do autor" value={formData.autor} onChange={handleChange} className="border border-gray-200 rounded-xl bg-gray-50/50 px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 mb-1">Categoria:</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange} className="border border-gray-200 rounded-xl bg-gray-50/50 px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-semibold text-gray-700 cursor-pointer transition" required>
                {listaCategorias.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-600 mb-1">Resumo:</label>
            <textarea name="resumo" rows="3" placeholder="Introduza o resumo do livro" value={formData.resumo} onChange={handleChange} className="border border-gray-200 rounded-xl bg-gray-50/50 px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition w-full" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-400 mb-1">Capa: {arquivos.capa ? arquivos.capa.name : "Nenhuma selecionada"}</span>
              <label className="cursor-pointer bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold transition shadow-sm">
                📁 Escolher Capa
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "capa")} className="hidden" />
              </label>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-400 mb-1">PDF: {arquivos.pdf ? arquivos.pdf.name : "Nenhum selecionado"}</span>
              <label className="cursor-pointer bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold transition shadow-sm">
                📁 Escolher PDF
                <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, "pdf")} className="hidden" />
              </label>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button type="submit" className="px-8 py-3 bg-[#db2777] hover:bg-[#be185d] text-white font-bold rounded-xl shadow-md transition duration-200 text-sm tracking-wide">
              {idEdicao ? "💾 Atualizar Alterações" : "➕ Adicionar Livro"}
            </button>
            {idEdicao && (
              <button type="button" onClick={limparFormulario} className="py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 shadow-sm transition duration-200 text-sm px-6">
                ❌ Cancelar Edição
              </button>
            )}
          </div>
        </form>

        {/* Tabela de Dados */}
        <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-md bg-white mt-8">
          <table className="min-w-full divide-y divide-gray-200 text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Capa</th>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Autor</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3 w-1/4">Resumo</th>
                <th className="px-4 py-3">PDF</th>
                <th className="px-4 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-gray-600">
              {livros.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400 font-medium">
                    {carregando ? "⏳ Carregando..." : "Nenhum livro localizado na base de dados."}
                  </td>
                </tr>
              ) : (
                livros.map((livro) => {
                  const currentId = livro._id || livro.id;
                  const isEditing = idEdicao === currentId;
                  const isRemoving = livroRemovendo === currentId;

                  return (
                    <tr key={currentId} className={`hover:bg-gray-50 transition ${isEditing ? "bg-pink-50 border-l-4 border-[#db2777]" : ""}`}>
                      <td className="px-4 py-3">
                        {livro.capa ? (
                          <img
                            src={getCapaUrl(livro.capa)}
                            alt={livro.titulo}
                            className="w-12 h-16 object-cover rounded-lg"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-12 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-[8px]">SEM CAPA</div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-900">{livro.titulo}</td>
                      <td className="px-4 py-3 font-medium">{livro.autor}</td>
                      <td className="px-4 py-3">
                        <span className="bg-pink-50 text-[#db2777] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                          {livro.categoria}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-xs truncate text-gray-500" title={livro.resumo}>
                        {livro.resumo}
                      </td>
                      <td className="px-4 py-3 font-mono text-red-600 truncate max-w-[120px]">
                        {livro.pdf ? (
                          <span className="text-blue-600">📄 {livro.pdf}</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => prepararEdicao(livro)}
                            disabled={isEditing}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-sm transition duration-200 text-xs font-bold ${isEditing ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#db2777] hover:bg-[#be185d] text-white"}`}
                            title={isEditing ? "A editar este livro" : "Editar livro"}
                          >
                            <EditIcon />
                            {isEditing ? "A editar..." : "Editar"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removerLivro(currentId)}
                            disabled={isRemoving}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-sm transition duration-200 text-xs font-bold ${isRemoving ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"}`}
                          >
                            <TrashIcon />
                            {isRemoving ? "⏳..." : "Remover"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Link Inferior */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-xs text-gray-400 hover:text-[#db2777] font-medium underline transition"
          >
            ← Sair do Painel e Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;