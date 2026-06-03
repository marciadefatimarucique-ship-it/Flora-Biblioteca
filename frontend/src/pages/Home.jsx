
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
import { Link } from "react-router-dom"

function Home() {

  return (

    <div className="min-h-screen bg-pink-50">

      {/* HERO */}

      <section className="px-10 py-24 text-center">

        <h1 className="text-7xl font-extrabold text-pink-700 leading-tight">

          Flora Biblioteca
          <br />
          Digital

        </h1>

        <p className="text-gray-600 text-xl mt-8 max-w-3xl mx-auto">

          Plataforma moderna para gestão, leitura e descoberta de livros digitais.

        </p>

        <div className="flex justify-center gap-6 mt-10">

          <Link
            to="/catalog"
            className="bg-pink-600 text-white px-8 py-4 rounded-2xl text-lg shadow-lg hover:scale-105 duration-300"
          >

            Explorar Livros

          </Link>

          <Link
            to="/register"
            className="bg-white border border-pink-300 text-pink-700 px-8 py-4 rounded-2xl text-lg shadow-lg hover:scale-105 duration-300"
          >

            Criar Conta

          </Link>

        </div>

      </section>

      {/* ESTATÍSTICAS */}

      <section className="grid md:grid-cols-3 gap-8 px-10 py-10">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <h2 className="text-5xl font-bold text-pink-700">
            500+
          </h2>

          <p className="text-gray-600 mt-4">
            Livros disponíveis
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <h2 className="text-5xl font-bold text-pink-700">
            1200+
          </h2>

          <p className="text-gray-600 mt-4">
            Utilizadores activos
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <h2 className="text-5xl font-bold text-pink-700">
            24h
          </h2>

          <p className="text-gray-600 mt-4">
            Acesso online
          </p>

        </div>

      </section>

      {/* FEATURES */}

      <section className="px-10 py-20">

        <h2 className="text-5xl font-bold text-center text-pink-700 mb-16">

          Recursos da Plataforma

        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h3 className="text-3xl font-bold text-pink-700 mb-4">

              Catálogo Inteligente

            </h3>

            <p className="text-gray-600">

              Pesquisa rápida de livros por categoria, autor ou título.

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h3 className="text-3xl font-bold text-pink-700 mb-4">

              Biblioteca Digital

            </h3>

            <p className="text-gray-600">

              Gestão moderna de livros digitais com acesso online.

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h3 className="text-3xl font-bold text-pink-700 mb-4">

              Sistema Seguro

            </h3>

            <p className="text-gray-600">

              Autenticação real com JWT e MongoDB Atlas.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-pink-700 text-white py-10 text-center mt-20">

        <h2 className="text-3xl font-bold">
          Flora Biblioteca Digital
        </h2>

        <p className="mt-4 text-pink-100">

          Sistema moderno desenvolvido com React, Node.js e MongoDB.

        </p>

      </footer>

    </div>

  )
}

export default Home

