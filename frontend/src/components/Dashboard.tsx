import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from './RecipeCard';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  to: string;
  count?: number;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  count, 
  color 
}) => (
  <Link
    to={to}
    className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      {count !== undefined && (
        <span className={`px-3 py-1 ${color.replace('bg-', 'bg-').replace('/20', '/10')} text-sm font-semibold rounded-full border`}>
          {count}
        </span>
      )}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
  </Link>
);

interface QuickActionProps {
  title: string;
  icon: string;
  onClick: () => void;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, icon, onClick, color }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 ${color} rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg`}
  >
    <span className="text-2xl mb-2">{icon}</span>
    <span className="text-sm font-medium text-gray-700">{title}</span>
  </button>
);

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  // Dati mock per la demo - sostituisci con dati reali dal tuo backend
  const stats = {
    totalRecipes: 24,
    plannedMeals: 7,
    shoppingItems: 12,
    favoriteRecipes: 8
  };

  const recentActivity = [
    { action: "Aggiunta ricetta", item: "Pasta alla Carbonara", time: "2 ore fa", icon: "🍝", image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d524?w=400&h=300&fit=crop&crop=faces" },
    { action: "Pianificato pasto", item: "Cena di Domenica", time: "1 giorno fa", icon: "📅", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=faces" },
    { action: "Lista spesa creata", item: "Spesa Settimanale", time: "2 giorni fa", icon: "🛒", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=faces" },
  ];

  const featuredRecipes = [
    { 
      name: "Pasta alla Carbonara", 
      cookTime: "20 min", 
      difficulty: "Facile" as const, 
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d524?w=400&h=300&fit=crop&crop=faces",
      rating: 4.8,
      calories: 650,
      servings: 4,
      tags: ["Italiana", "Pasta", "Veloce"],
      description: "Un classico della cucina italiana, cremosa e saporita."
    },
    { 
      name: "Pizza Margherita", 
      cookTime: "45 min", 
      difficulty: "Media" as const, 
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=faces",
      rating: 4.9,
      calories: 800,
      servings: 2,
      tags: ["Italiana", "Pizza", "Vegetariana"],
      description: "La pizza più amata al mondo con pomodoro, mozzarella e basilico."
    },
    { 
      name: "Risotto ai Funghi", 
      cookTime: "35 min", 
      difficulty: "Media" as const, 
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&crop=faces",
      rating: 4.7,
      calories: 420,
      servings: 4,
      tags: ["Italiana", "Risotto", "Funghi"],
      description: "Cremoso risotto con funghi porcini e parmigiano."
    }
  ];

  if (!isAuthenticated) {
    // Dashboard pubblica per utenti non autenticati
    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative text-center py-16 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl text-white shadow-2xl overflow-hidden">
          {/* Background Image Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop&crop=faces')"
            }}
          ></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <span className="text-4xl">🍴</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Benvenuto in MealBuddy
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              La tua app per organizzare ricette, pianificare pasti e gestire la spesa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Accedi
              </Link>
              <Link
                to="/register"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-white/30"
              >
                Registrati
              </Link>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300">
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=faces"
                alt="Gestisci Ricette"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-green-100 items-center justify-center text-3xl">
                🍲
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gestisci Ricette</h3>
            <p className="text-gray-600">Salva e organizza le tue ricette preferite</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300">
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=100&h=100&fit=crop&crop=faces"
                alt="Pianifica Pasti"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-blue-100 items-center justify-center text-3xl">
                📅
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pianifica Pasti</h3>
            <p className="text-gray-600">Organizza i tuoi pasti settimanali</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300">
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop&crop=faces"
                alt="Lista Spesa"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-purple-100 items-center justify-center text-3xl">
                🛒
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Lista Spesa</h3>
            <p className="text-gray-600">Crea liste della spesa intelligenti</p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard autenticata
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
              Ecco un riepilogo delle tue attività culinarie
            </p>
          </div>
          <div className="hidden md:flex w-20 h-20 bg-white/20 rounded-full items-center justify-center">
            <span className="text-4xl">🍴</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl mb-2">🍲</div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalRecipes}</div>
          <div className="text-sm text-gray-600">Ricette</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold text-gray-800">{stats.plannedMeals}</div>
          <div className="text-sm text-gray-600">Pasti Pianificati</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl mb-2">🛒</div>
          <div className="text-2xl font-bold text-gray-800">{stats.shoppingItems}</div>
          <div className="text-sm text-gray-600">Items Spesa</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl mb-2">❤️</div>
          <div className="text-2xl font-bold text-gray-800">{stats.favoriteRecipes}</div>
          <div className="text-sm text-gray-600">Preferite</div>
        </div>
      </div>

      {/* Main Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <DashboardCard
          title="Ricette"
          description="Esplora, aggiungi e gestisci le tue ricette preferite"
          icon="🍲"
          to="/recipes"
          count={stats.totalRecipes}
          color="bg-green-100"
        />
        <DashboardCard
          title="Pianificazione"
          description="Organizza i tuoi pasti per la settimana"
          icon="📅"
          to="/meal-plan"
          count={stats.plannedMeals}
          color="bg-blue-100"
        />
        <DashboardCard
          title="Lista Spesa"
          description="Gestisci la tua lista della spesa intelligente"
          icon="🛒"
          to="/shopping-list"
          count={stats.shoppingItems}
          color="bg-purple-100"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Azioni Rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction
            title="Nuova Ricetta"
            icon="➕"
            onClick={() => console.log('Add recipe')}
            color="bg-green-50 hover:bg-green-100"
          />
          <QuickAction
            title="Pianifica Oggi"
            icon="📋"
            onClick={() => console.log('Plan today')}
            color="bg-blue-50 hover:bg-blue-100"
          />
          <QuickAction
            title="Aggiungi alla Spesa"
            icon="🛍️"
            onClick={() => console.log('Add to shopping')}
            color="bg-purple-50 hover:bg-purple-100"
          />
          <QuickAction
            title="Ricerca Ricette"
            icon="🔍"
            onClick={() => console.log('Search recipes')}
            color="bg-orange-50 hover:bg-orange-100"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Attività Recenti</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 shadow-sm">
                <img 
                  src={activity.image} 
                  alt={activity.item}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-white items-center justify-center text-xl">
                  {activity.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{activity.action}</div>
                <div className="text-sm text-gray-600">{activity.item}</div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Recipes Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Ricette in Evidenza</h2>
          <Link 
            to="/recipes" 
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            Vedi tutte →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              name={recipe.name}
              image={recipe.image}
              cookTime={recipe.cookTime}
              difficulty={recipe.difficulty}
              rating={recipe.rating}
              calories={recipe.calories}
              servings={recipe.servings}
              tags={recipe.tags}
              description={recipe.description}
              onClick={() => console.log(`Clicked on ${recipe.name}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
