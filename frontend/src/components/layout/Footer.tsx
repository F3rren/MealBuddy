import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-white">🍽️</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  MealBuddy
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Il tuo assistente personale per la gestione intelligente dei pasti, 
                ricette e lista della spesa. Semplifica la tua vita culinaria!
              </p>
              
              {/* Social Links */}
              <div>
                <p className="text-xs text-gray-500 mb-3">Seguici sui social:</p>
                <div className="flex space-x-3">
                  <a href="#" className="w-9 h-9 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md">
                    <span className="text-white text-sm">📘</span>
                  </a>
                  <a href="#" className="w-9 h-9 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md">
                    <span className="text-white text-sm">📸</span>
                  </a>
                  <a href="#" className="w-9 h-9 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md">
                    <span className="text-white text-sm">🐦</span>
                  </a>
                  <a href="#" className="w-9 h-9 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md">
                    <span className="text-white text-sm">📺</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                <div className="flex justify-center mb-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-lg">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed mb-4">
                  "MealBuddy ha rivoluzionato il modo in cui organizzo i miei pasti!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">👨‍🍳</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">Marco R.</p>
                    <p className="text-gray-500 text-xs">Chef amatoriale</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Funzionalità */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                <span className="mr-2">🚀</span> Funzionalità
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/recipes" className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>📚</span>
                    <span>Gestione Ricette</span>
                  </a>
                </li>
                <li>
                  <a href="/meal-plan" className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>📅</span>
                    <span>Pianificazione Pasti</span>
                  </a>
                </li>
                <li>
                  <a href="/shopping-list" className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>🛒</span>
                    <span>Lista della Spesa</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>📊</span>
                    <span>Analisi Nutrizionali</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>👥</span>
                    <span>Condivisione Familiare</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Supporto */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                <span className="mr-2">💡</span> Supporto
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>❓</span>
                    <span>FAQ</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>📖</span>
                    <span>Guida Utente</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>💬</span>
                    <span>Contattaci</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>🐛</span>
                    <span>Segnala Bug</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span>⭐</span>
                    <span>Lascia Recensione</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Copyright and Info */}
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600">
              <span>© {currentYear} MealBuddy. Tutti i diritti riservati.</span>
              <span className="hidden md:inline text-gray-400">•</span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Versione 2.1.0</span>
              </span>
              <span className="hidden md:inline text-gray-400">•</span>
              <span className="text-green-600 flex items-center space-x-1">
                <span>✅</span>
                <span>Sistema Online</span>
              </span>
            </div>

            {/* Legal Links and Downloads */}
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Termini</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Cookie</a>
              </div>
              
              <div className="flex space-x-2">
                <a href="#" className="bg-gray-900 text-white px-3 py-1 rounded-md text-xs hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-1">
                  <span>📱</span>
                  <span>App Store</span>
                </a>
                <a href="#" className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition-colors duration-200 flex items-center space-x-1">
                  <span>🤖</span>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
