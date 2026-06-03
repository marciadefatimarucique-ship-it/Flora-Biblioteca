import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans flex flex-col justify-center items-center p-4 selection:bg-pink-100">

      {/* Título com a cor viva e estilo marcante da Flora */}
      <h1 className="text-4xl sm:text-5xl font-black text-[#db2777] mb-4 text-center tracking-tight drop-shadow-sm">
        Flora Biblioteca 
      </h1>

      {/* Texto de Boas-vindas sem alterações */}
      <p className="text-base sm:text-xl text-center text-gray-600 max-w-xl mb-10 font-normal tracking-wide px-4">
        Seja bem-vindo(a)! Descubra o prazer de ler com a Flora.
      </p>

      {/* Bloco de Botões com o formato Pill arredondado */}
      <div className="flex flex-row items-center justify-center gap-5 w-full">

        {/* Botão Login: Preenchido */}
        <Link
          to="/login"
          className="px-8 py-2.5 bg-[#db2777] hover:bg-[#be185d] text-white font-bold rounded-xl shadow-md transition duration-200 min-w-32 text-center text-sm sm:text-base tracking-wide"
        >
          Login
        </Link>

        {/* Botão Cadastro: Outline com borda fina */}
        <Link
          to="/register"
          className="px-8 py-2.5 bg-white hover:bg-pink-50 text-[#db2777] font-bold rounded-xl border border-pink-200 shadow-sm transition duration-200 min-w-32 text-center text-sm sm:text-base tracking-wide"
        >
          Cadastro
        </Link>

      </div>

    </div>
  );
}

export default Home;
