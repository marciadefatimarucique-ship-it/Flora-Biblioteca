import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const API_BASE = "https://flora-biblioteca-1.onrender.com/api";

  const [nomeExibido, setNomeExibido] = useState("Leitor");
  const [emailExibido, setEmailExibido] = useState("");
  const [userRole, setUserRole] = useState("leitor");

  const [historicoLeitura, setHistoricoLeitura] = useState([]);
  const [loadingHistorico, setLoadingHistorico] = useState(true);

  const [senhaData, setSenhaData] = useState({ senhaNova: "", senhaConfirma: "" });
  const [loading, setLoading] = useState(false);
  const [erroSenha, setErroSenha] = useState("");
  const [sucessoSenha, setSucessoSenha] = useState("");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    const emailSalvo = localStorage.getItem("emailUsuario");
    const roleSalvo  = localStorage.getItem("userRole");

    if (nomeSalvo) setNomeExibido(nomeSalvo);
    if (emailSalvo) setEmailExibido(emailSalvo);
    if (roleSalvo)  setUserRole(roleSalvo);

    // Carregar histórico de leituras da API
    const token = localStorage.getItem("token");
    if (token && token !== "admin-token-local") {
      fetch(`${API_BASE}/usuarios/historico`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((dados) => setHistoricoLeitura(Array.isArray(dados) ? dados : []))
        .catch(() => setHistoricoLeitura([]))
        .finally(() => setLoadingHistorico(false));
    } else {
      setLoadingHistorico(false);
    }
  }, []);

  const handleChange = (e) => {
    setSenhaData({ ...senhaData, [e.target.name]: e.target.value });
    setErroSenha("");
    setSucessoSenha("");
  };

  const handleAlterarSenha = async (e) => {
    e.preventDefault();
    setErroSenha("");
    setSucessoSenha("");

    if (senhaData.senhaNova !== senhaData.senhaConfirma) {
      setErroSenha("As senhas não coincidem.");
      return;
    }
    if (senhaData.senhaNova.length < 6) {
      setErroSenha("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE}/usuarios/alterar-senha`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ novaSenha: senhaData.senhaNova }),
      });

      const data = await response.json();

      if (response.ok) {
        setSucessoSenha("Senha alterada com sucesso!");
        setSenhaData({ senhaNova: "", senhaConfirma: "" });
      } else {
        setErroSenha(data.message || "Erro ao alterar senha.");
      }
    } catch {
      setErroSenha("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-gray-700 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col">

        <div className="w-full flex justify-end mb-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-5 py-1.5 bg-white hover:bg-gray-50 text-gray-600 font-semibold rounded-xl border border-gray-200 shadow-sm transition text-sm"
          >
            ← Voltar ao Menu
          </button>
        </div>

        {/* Cabeçalho do perfil */}
        <header className="w-full text-center flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center border-2 border-pink-300 text-[#db2777] text-3xl font-black mb-3 shadow-sm uppercase">
            {nomeExibido.charAt(0)}
          </div>
          <h1 className="text-3xl font-black text-[#db2777] tracking-tight mb-1">
            {nomeExibido}
          </h1>
          <p className="text-gray-400 text-sm">{emailExibido}</p>
          <span className="mt-2 text-xs bg-pink-50 text-[#db2777] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {userRole === "admin" ? "⚙️ Administrador" : "📖 Leitor"}
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Histórico de Leituras */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
            <h3 className="text-sm font-extrabold text-[#db2777] tracking-wider uppercase border-b-2 border-pink-50 pb-2 mb-4">
              📚 Histórico de Leitura
            </h3>
            {loadingHistorico ? (
              <p className="text-xs text-gray-400 animate-pulse">A carregar...</p>
            ) : historicoLeitura.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Nenhuma leitura registada ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                      <th className="pb-2">Título</th>
                      <th className="pb-2">Categoria</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 divide-y divide-gray-50">
                    {historicoLeitura.map((livro) => (
                      <tr key={livro._id} className="hover:bg-pink-50/20 transition">
                        <td className="py-2.5 font-bold text-gray-800">{livro.titulo}</td>
                        <td className="py-2.5">
                          <span className="bg-pink-50 text-pink-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                            {livro.categoria}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Alterar Senha */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
            <h3 className="text-sm font-extrabold text-[#db2777] tracking-wider uppercase border-b-2 border-pink-50 pb-2 mb-4">
              🔒 Alterar Senha de Acesso
            </h3>

            {erroSenha && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
                ⚠️ {erroSenha}
              </div>
            )}
            {sucessoSenha && (
              <div className="mb-3 p-3 bg-green-50 border border-green-200 text-green-600 text-xs rounded-xl font-medium">
                ✅ {sucessoSenha}
              </div>
            )}

            <form onSubmit={handleAlterarSenha} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1">Nova Senha:</label>
                <input
                  type="password"
                  name="senhaNova"
                  placeholder="Mínimo 6 caracteres"
                  value={senhaData.senhaNova}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1">Confirmar Senha:</label>
                <input
                  type="password"
                  name="senhaConfirma"
                  placeholder="Repita a nova senha"
                  value={senhaData.senhaConfirma}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-[#db2777] hover:bg-[#be185d] disabled:bg-gray-300 text-white font-bold rounded-xl shadow-md transition text-sm"
                >
                  {loading ? "A guardar..." : "Alterar e Confirmar"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
