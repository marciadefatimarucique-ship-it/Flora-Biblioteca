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