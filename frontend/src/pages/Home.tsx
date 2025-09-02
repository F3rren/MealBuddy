import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, user, sessionExpired, clearSessionExpired } = useAuth();
  const [animateElements, setAnimateElements] = useState({
    hero: false,
    features: false,
    howItWorks: false,
    benefits: false,
    testimonials: false,
    stats: false,
    cta: false
  });

  useEffect(() => {
    // Trigger initial animation
    
    // Stagger animations for different sections
    const timeouts = [
      setTimeout(() => setAnimateElements(prev => ({ ...prev, hero: true })), 100),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, features: true })), 300),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, howItWorks: true })), 500),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, benefits: true })), 700),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, testimonials: true })), 900),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, stats: true })), 1100),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, cta: true })), 1300)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Animation component for reusable fade-in effects
  const AnimatedSection: React.FC<{ 
    children: React.ReactNode; 
    isVisible: boolean; 
    delay?: number;
    className?: string;
  }> = ({ children, isVisible, delay = 0, className = "" }) => (
    <div 
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  if (isAuthenticated) {
    // Per utenti autenticati, reindirizza alla dashboard
    return (
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Ciao, {user?.username}!
              </h1>
              <p className="text-lg opacity-90">
                Benvenuto nella tua cucina digitale
              </p>
            </div>
            <div className="hidden md:flex w-20 h-20 bg-white/20 rounded-full items-center justify-center">
              <span className="text-4xl">🍴</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/dashboard"
            className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                📊
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              Dashboard Completa
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Visualizza le tue statistiche dettagliate e analytics
            </p>
          </Link>

          <Link
            to="/recipes"
            className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                🍲
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
              Le Tue Ricette
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Esplora e gestisci la tua collezione di ricette
            </p>
          </Link>

          <Link
            to="/meal-plan"
            className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                📅
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
              Pianificazione
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Organizza i tuoi pasti settimanali
            </p>
          </Link>
        </div>
      </div>
    );
  }

  // Homepage pubblica per utenti non autenticati
  return (
    <div className="space-y-8">
      {sessionExpired && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-4 text-center font-semibold max-w-xl mx-auto">
          La sessione è scaduta. Effettua di nuovo il login.
        </div>
      )}
      {/* Hero Section */}
      <AnimatedSection isVisible={animateElements.hero} className="relative text-center py-16 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl text-white shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-1000 hover:opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop&crop=faces')"
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm animate-bounce">
            <span className="text-4xl">🍴</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">
            Benvenuto in MealBuddy
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            La tua app per organizzare ricette, pianificare pasti e gestire la spesa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg transform hover:-translate-y-1"
              onClick={clearSessionExpired}
            >
              Accedi
            </Link>
            <Link
              to="/register"
              className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30 transform hover:-translate-y-1"
            >
              Registrati
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Preview */}
      <AnimatedSection isVisible={animateElements.features} delay={200}>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              🍲
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">Gestisci Ricette</h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Salva e organizza le tue ricette preferite con ingredienti, istruzioni e foto</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              📅
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">Pianifica Pasti</h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Organizza i tuoi pasti settimanali e non rimanere mai senza idee</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              🛒
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">Lista Spesa</h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Crea liste della spesa intelligenti basate sui tuoi pasti pianificati</p>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection isVisible={animateElements.howItWorks} delay={400}>
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-500">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 hover:text-green-600 transition-colors duration-300">
              Come Funziona MealBuddy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tre semplici passi per trasformare la tua esperienza culinaria
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:animate-pulse">
                  1️⃣
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-blue-300 transform -translate-y-1/2 group-hover:animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">Raccogli le Ricette</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Aggiungi le tue ricette preferite con ingredienti, tempi di cottura e difficoltà. 
                Importa anche dalle tue fonti online preferite!
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:animate-pulse">
                  2️⃣
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2 group-hover:animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">Pianifica la Settimana</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Organizza i tuoi pasti settimanali trascinando le ricette nel calendario. 
                MealBuddy ti suggerirà anche combinazioni equilibrate!
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:animate-pulse">
                3️⃣
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">Fai la Spesa</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Genera automaticamente la lista della spesa basata sui pasti pianificati. 
                Organizza per categorie e non dimenticare mai nulla!
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection isVisible={animateElements.benefits} delay={600}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-2xl text-white mr-4 hover:rotate-12 hover:scale-110 transition-all duration-300">
                ⏰
              </div>
              <h3 className="text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors duration-300">Risparmia Tempo</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>Pianificazione automatica dei pasti settimanali</span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>Liste della spesa generate automaticamente</span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>Suggerimenti intelligenti basati sulle tue preferenze</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl text-white mr-4 hover:rotate-12 hover:scale-110 transition-all duration-300">
                💰
              </div>
              <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">Riduci gli Sprechi</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Compra solo quello che ti serve realmente</span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Utilizza al meglio gli ingredienti che hai</span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Monitora le scadenze e riduci gli sprechi</span>
              </li>
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonial Section */}
      <AnimatedSection isVisible={animateElements.testimonials} delay={800}>
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-500">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">
              Cosa Dicono i Nostri Utenti
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:-translate-y-3 transition-all duration-500">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl group-hover:animate-bounce group-hover:bg-green-100 transition-colors duration-300">
                👩‍🍳
              </div>
              <blockquote className="text-gray-600 italic mb-4 group-hover:text-gray-800 transition-colors duration-300">
                "MealBuddy ha rivoluzionato il mio modo di cucinare. Non spreco più tempo a pensare cosa cucinare!"
              </blockquote>
              <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">- Maria, Chef Casalinga</p>
            </div>
            
            <div className="text-center group hover:transform hover:-translate-y-3 transition-all duration-500">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl group-hover:animate-bounce group-hover:bg-blue-100 transition-colors duration-300">
                👨‍💼
              </div>
              <blockquote className="text-gray-600 italic mb-4 group-hover:text-gray-800 transition-colors duration-300">
                "Perfetto per chi lavora tanto. Pianifico tutto nel weekend e la settimana fila liscia!"
              </blockquote>
              <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">- Luca, Manager</p>
            </div>
            
            <div className="text-center group hover:transform hover:-translate-y-3 transition-all duration-500">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl group-hover:animate-bounce group-hover:bg-purple-100 transition-colors duration-300">
                👩‍👧‍👦
              </div>
              <blockquote className="text-gray-600 italic mb-4 group-hover:text-gray-800 transition-colors duration-300">
                "Con tre bambini è difficile organizzarsi. MealBuddy mi ha semplificato la vita!"
              </blockquote>
              <p className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">- Anna, Mamma di 3</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection isVisible={animateElements.stats} delay={1000}>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white hover:shadow-2xl transition-shadow duration-500 transform hover:scale-[1.02]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 hover:text-green-400 transition-colors duration-300">MealBuddy in Numeri</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Ricette Salvate</div>
            </div>
            <div className="group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">5K+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Utenti Attivi</div>
            </div>
            <div className="group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Pasti Pianificati</div>
            </div>
            <div className="group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">30%</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Sprechi Ridotti</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA Section */}
      <AnimatedSection isVisible={animateElements.cta} delay={1200}>
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:animate-pulse">
            Pronto a Iniziare?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Unisciti a migliaia di persone che hanno già trasformato la loro cucina con MealBuddy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg text-lg transform hover:-translate-y-1"
            >
              Inizia Gratis Ora
            </Link>
            <Link
              to="/login"
              className="bg-white/20 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm border-2 border-white/30 text-lg transform hover:-translate-y-1"
            >
              Ho già un Account
            </Link>
          </div>
          <p className="text-sm mt-4 opacity-75 hover:opacity-100 transition-opacity duration-300">
            Gratuito per sempre • Nessuna carta di credito richiesta
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;
