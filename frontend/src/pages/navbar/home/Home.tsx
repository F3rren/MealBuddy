import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Benvenuto in MealBuddy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            La tua app intelligente per gestire i pasti, scoprire ricette
            e pianificare la spesa in modo semplice e organizzato!
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:scale-105">
            <div className="text-6xl mb-6 text-center">🍳</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Ricette</h3>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Scopri e salva le tue ricette preferite con ingredienti e istruzioni dettagliate.
            </p>
            <div className="text-center">
              <Link 
                to="/recipes" 
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 font-semibold"
              >
                Esplora Ricette
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:scale-105">
            <div className="text-6xl mb-6 text-center">📅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Pianificazione</h3>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Pianifica i tuoi pasti settimanali e non rimanere mai senza idee.
            </p>
            <div className="text-center">
              <Link 
                to="/meal-plan" 
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold"
              >
                Pianifica Ora
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:scale-105">
            <div className="text-6xl mb-6 text-center">🛒</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Lista Spesa</h3>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Genera automaticamente la lista della spesa basata sui tuoi pasti pianificati.
            </p>
            <div className="text-center">
              <Link 
                to="/shopping-list" 
                className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300 font-semibold"
              >
                Crea Lista
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Inizia il tuo viaggio culinario oggi!</h2>
          <p className="text-xl mb-8 opacity-90">
            Unisciti a migliaia di utenti che hanno già trasformato il loro modo di cucinare
          </p>
          <div className="space-x-4">
            <Link 
              to="/register" 
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-bold text-lg"
            >
              Registrati Gratis
            </Link>
            <Link 
              to="/login" 
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300 font-bold text-lg"
            >
              Accedi
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Ricette Disponibili</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600 font-medium">Utenti Attivi</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">2000+</div>
            <div className="text-gray-600 font-medium">Pasti Pianificati</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600 font-medium">Soddisfazione</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
