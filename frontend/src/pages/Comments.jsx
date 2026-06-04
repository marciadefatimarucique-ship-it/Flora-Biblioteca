import { useState, useEffect } from "react";

function Comments({ livroId }) {
  const API_URL = `http://localhost:5000/api/comentarios/${livroId}`;

  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const nomeGuardado = localStorage.getItem("nomeUsuario") || "";
  const [form, setForm] = useState({ nomeAutor: nomeGuardado, texto: "" });

  const carregarComentarios = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const dados = await response.json();
        setComentarios(dados);
      }
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (livroId) carregarComentarios();
  }, [livroId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!form.texto.trim()) {
      setErro("O comentário não pode estar vazio.");
      return;
    }

    setEnviando(true);
    setErro("");
    setSucesso("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeAutor: form.nomeAutor.trim() || "Anónimo",
          texto: form.texto.trim(),
        }),
      });

      if (response.ok) {
        setSucesso("Comentário enviado!");
        setForm({ ...form, texto: "" });
        carregarComentarios();
        setTimeout(() => setSucesso(""), 3000);
      } else {
        const d = await response.json();
        setErro(d.message || "Erro ao enviar comentário.");
      }
    } catch {
      setErro("Erro de conexão com o servidor.");
    } finally {
      setEnviando(false);
    }
  };

  const formatarData = (dataStr) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-PT", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Lista de comentários */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {loading ? (
          <p className="text-sm text-gray-400 animate-pulse text-center py-4">A carregar comentários...</p>
        ) : comentarios.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-4">
            Ainda não há comentários. Seja o primeiro! 💬
          </p>
        ) : (
          comentarios.map((c) => (
            <div key={c._id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-[#d11a5f]">
                  {c.nomeAutor}
                </span>
                <span className="text-[10px] text-gray-400">
                  {formatarData(c.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{c.texto}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulário de novo comentário */}
      <form onSubmit={handleEnviar} className="space-y-3 border-t border-gray-100 pt-4">
        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Deixe o seu comentário</h5>

        {erro && (
          <div className="p-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">⚠️ {erro}</div>
        )}
        {sucesso && (
          <div className="p-2 bg-green-50 border border-green-200 text-green-600 text-xs rounded-lg">✅ {sucesso}</div>
        )}

        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-400 mb-1">Nome (opcional):</label>
          <input
            type="text"
            name="nomeAutor"
            placeholder="O seu nome ou Anónimo"
            value={form.nomeAutor}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-pink-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-400 mb-1">Comentário:</label>
          <textarea
            name="texto"
            rows="3"
            placeholder="Escreva a sua opinião sobre este livro..."
            value={form.texto}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-pink-400 transition resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="w-full py-2.5 bg-[#d11a5f] hover:bg-[#b0104b] disabled:bg-gray-300 text-white font-bold rounded-xl transition text-sm"
        >
          {enviando ? "A enviar..." : "💬 Enviar Comentário"}
        </button>
      </form>
    </div>
  );
}

export default Comments;