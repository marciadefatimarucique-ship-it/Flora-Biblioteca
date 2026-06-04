import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/usuarios/alterar-senha"; 

  // ESTADOS OPERACIONAIS DINÂMICOS
  const [nomeExibido, setNomeExibido] = useState("Leitor");
  const [emailExibido, setEmailExibido] = useState("leitor@flora.com");
  
  const [historicoLeitura] = useState([
    { id: 1, titulo: "Ficções", data: "Hoje", categoria: "Ficção" }
  ]);

  const [senhaData, setSenhaData] = useState({ senhaNova: "", senhaConfirma: "" });
  const [loading, setLoading] = useState(false);

  // PEGA OS DADOS OPERACIONAIS DE QUEM LOGOU (EX: MÁRCIA)
  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    const emailSalvo = localStorage.getItem("emailUsuario");

    if (nomeSalvo) setNomeExibido(nomeSalvo);
    if (emailSalvo) setEmailExibido(emailSalvo);
  }, []);

  const handleChange = (e) => {
    setSenhaData({ ...senhaData, [e.target.name]: e.target.value });
  };

  const handleAlterarSenha = async (e) => {
    e.preventDefault();

    if (senhaData.senhaNova !== senhaData.senhaConfirma) {
      alert("As senhas não coincidem! Verifique e tente novamente.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailExibido,
          novaSenha: senhaData.senhaNova
        })
      });

      if (response.ok) {
        alert("Senha alterada no MongoDB com sucesso!");
        setSenhaData({ senhaNova: "", senhaConfirma: "" });
      } else {
        const erro = await response.json();
        alert(erro.message || "Erro ao tentar alterar a senha.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-gray-700 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col">
        
        <div className="w-full flex justify-end mb-6">
          <button type="button" onClick={() => navigate("/dashboard")} className="px-5 py-1.5 bg-white hover:bg-gray-50 text-gray-600 font-semibold rounded-xl border border-gray-200 shadow-sm transition text-sm">
            ← Voltar ao Menu
          </button>
        </div>

        {/* EXIBIÇÃO DINÂMICA DO NOME OPERACIONAL */}
        <header className="w-full text-center flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center border-2 border-pink-300 text-[#db2777] text-3xl font-black mb-3 shadow-sm uppercase">
            {nomeExibido.charAt(0)}
          </div>
          <h1 className="text-3xl font-black text-[#db2777] tracking-tight mb-1">
            {nomeExibido}
          </h1>
          <p className="text-gray-400 text-sm">{emailExibido}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Histórico de Leituras */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
            <h3 className="text-sm font-extrabold text-[#db2777] tracking-wider uppercase border-b-2 border-pink-50 pb-2 mb-4">
              📚 Histórico de Leitura
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-2">Título</th>
                    <th className="pb-2">Categoria</th>
                    <th className="pb-2 text-right">Acesso</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y divide-gray-50">
                  {historicoLeitura.map((livro) => (
                    <tr key={livro.id} className="hover:bg-pink-50/20 transition">
                      <td className="py-2.5 font-bold text-gray-800">{livro.titulo}</td>
                      <td className="py-2.5">
                        <span className="bg-pink-50 text-pink-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">{livro.categoria}</span>
                      </td>
                      <td className="py-2.5 text-right text-gray-400 font-medium">{livro.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Formulário Alterar Senha */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
            <h3 className="text-sm font-extrabold text-[#db2777] tracking-wider uppercase border-b-2 border-pink-50 pb-2 mb-4">
              🔒 Alterar Senha de Acesso
            </h3>
            <form onSubmit={handleAlterarSenha} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1">Nova Senha:</label>
                <input type="password" name="senhaNova" placeholder="Introduza a nova senha" value={senhaData.senhaNova} onChange={handleChange} className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition" required />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1">Confirmar Senha:</label>
                <input type="password" name="senhaConfirma" placeholder="Confirme a nova senha" value={senhaData.senhaConfirma} onChange={handleChange} className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-pink-400 font-medium transition" required />
              </div>

              <div className="pt-2">
                <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#db2777] hover:bg-[#be185d] disabled:bg-gray-300 text-white font-bold rounded-xl shadow-md transition text-sm">
                  {loading ? "Sincronizando no Mango..." : "Alterar e Confirmar"}
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
