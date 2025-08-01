import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface MealStats {
  totalMeals: number;
  weeklyMeals: number;
  favoriteCategory: string;
  averageRating: number;
  caloriesThisWeek: number;
  savedRecipes: number;
  shoppingListItems: number;
  mealPlanDays: number;
}

interface WeeklyData {
  day: string;
  meals: number;
  calories: number;
}

interface CategoryData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'trends'>('overview');
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week');

  // Dati simulati (in una vera app verrebbero da API)
  const [stats] = useState<MealStats>({
    totalMeals: 156,
    weeklyMeals: 21,
    favoriteCategory: 'Italiana',
    averageRating: 4.7,
    caloriesThisWeek: 8750,
    savedRecipes: 47,
    shoppingListItems: 23,
    mealPlanDays: 7
  });

  const [weeklyData] = useState<WeeklyData[]>([
    { day: 'Lun', meals: 3, calories: 1250 },
    { day: 'Mar', meals: 4, calories: 1380 },
    { day: 'Mer', meals: 3, calories: 1200 },
    { day: 'Gio', meals: 3, calories: 1150 },
    { day: 'Ven', meals: 4, calories: 1420 },
    { day: 'Sab', meals: 2, calories: 980 },
    { day: 'Dom', meals: 2, calories: 1370 }
  ]);

  const [categoryData] = useState<CategoryData[]>([
    { name: 'Italiana', count: 45, percentage: 35, color: 'bg-red-500' },
    { name: 'Asiatica', count: 28, percentage: 22, color: 'bg-yellow-500' },
    { name: 'Mediterranea', count: 25, percentage: 19, color: 'bg-blue-500' },
    { name: 'Vegetariana', count: 20, percentage: 15, color: 'bg-green-500' },
    { name: 'Dolci', count: 12, percentage: 9, color: 'bg-purple-500' }
  ]);

  const maxCalories = Math.max(...weeklyData.map(d => d.calories));
  const maxMeals = Math.max(...weeklyData.map(d => d.meals));

  const QuickStatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle: string;
    icon: string;
    trend?: string;
    trendUp?: boolean;
    color: string;
  }> = ({ title, value, subtitle, icon, trend, trendUp, color }) => (
    <div className={`${color} rounded-2xl p-6 text-white relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div className="text-6xl transform rotate-12 mt-2 mr-2">
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-sm font-medium opacity-90 mb-1">{title}</h3>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <p className="text-sm opacity-75">{subtitle}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${trendUp ? 'text-green-200' : 'text-red-200'}`}>
            <span className="mr-1">{trendUp ? '📈' : '📉'}</span>
            {trend}
          </div>
        )}
      </div>
    </div>
  );

  const ProgressRing: React.FC<{ percentage: number; size: number; color: string }> = ({ 
    percentage, size, color 
  }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="relative">
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Bentornato, <span className="font-semibold text-gray-900">{user?.email || 'Chef'}!</span> 
            Ecco un riepilogo delle tue abitudini alimentari
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Time Frame Selector */}
          <div className="bg-gray-100 rounded-xl p-1 flex">
            {(['week', 'month', 'year'] as const).map((frame) => (
              <button
                key={frame}
                onClick={() => setTimeFrame(frame)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeFrame === frame
                    ? 'bg-white shadow-md text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {frame === 'week' ? 'Settimana' : frame === 'month' ? 'Mese' : 'Anno'}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <span>📊</span>
            <span>Esporta Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStatCard
          title="Pasti Totali"
          value={stats.totalMeals}
          subtitle="Dall'inizio dell'utilizzo"
          icon="🍽️"
          trend="+12% dal mese scorso"
          trendUp={true}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <QuickStatCard
          title="Questa Settimana"
          value={stats.weeklyMeals}
          subtitle="Pasti consumati"
          icon="📅"
          trend="+3 rispetto alla scorsa"
          trendUp={true}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <QuickStatCard
          title="Valutazione Media"
          value={stats.averageRating}
          subtitle="Stelle dei tuoi pasti"
          icon="⭐"
          trend="Stabile"
          trendUp={true}
          color="bg-gradient-to-br from-yellow-500 to-orange-500"
        />
        <QuickStatCard
          title="Calorie Settimanali"
          value={stats.caloriesThisWeek.toLocaleString()}
          subtitle="kcal consumate"
          icon="🔥"
          trend="-5% dalla scorsa settimana"
          trendUp={false}
          color="bg-gradient-to-br from-red-500 to-pink-500"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100">
          <nav className="flex">
            {[
              { id: 'overview', label: 'Panoramica', icon: '📊' },
              { id: 'nutrition', label: 'Nutrizione', icon: '🥗' },
              { id: 'trends', label: 'Tendenze', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Weekly Activity Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                    <span>📊</span>
                    <span>Attività Settimanale</span>
                  </h3>
                  <div className="space-y-4">
                    {weeklyData.map((day) => (
                      <div key={day.day} className="flex items-center space-x-4">
                        <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                        <div className="flex-1 flex items-center space-x-3">
                          {/* Meals Bar */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Pasti</span>
                              <span className="text-xs font-medium">{day.meals}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(day.meals / maxMeals) * 100}%` }}
                              />
                            </div>
                          </div>
                          {/* Calories Bar */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Calorie</span>
                              <span className="text-xs font-medium">{day.calories}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(day.calories / maxCalories) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Distribution */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                    <span>🍕</span>
                    <span>Categorie Preferite</span>
                  </h3>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div key={category.name} className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{category.name}</span>
                            <span className="text-sm text-gray-600">{category.count} ricette</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${category.color}`}
                              style={{ 
                                width: `${category.percentage}%`,
                                transitionDelay: `${index * 100}ms`
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{category.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Azioni Rapide</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <span className="text-lg">📝</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Pianifica Settimana</h4>
                        <p className="text-sm text-gray-600">Organizza i pasti futuri</p>
                      </div>
                    </div>
                  </button>
                  <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <span className="text-lg">🔍</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Cerca Ricette</h4>
                        <p className="text-sm text-gray-600">Trova nuove ispirazioni</p>
                      </div>
                    </div>
                  </button>
                  <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <span className="text-lg">🛒</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Lista Spesa</h4>
                        <p className="text-sm text-gray-600">Gestisci gli acquisti</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Nutrition Tab */}
          {activeTab === 'nutrition' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calorie Goals */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                    <span>🎯</span>
                    <span>Obiettivi Nutrizionali</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Calorie Giornaliere</h4>
                        <span className="text-2xl">🔥</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Consumate</span>
                          <span className="font-medium">1,250 kcal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-red-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Obiettivo: 1,800 kcal</span>
                          <span>75%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Proteine</h4>
                        <span className="text-2xl">💪</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Assunte</span>
                          <span className="font-medium">85g</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Obiettivo: 100g</span>
                          <span>85%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Carboidrati</h4>
                        <span className="text-2xl">🍞</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Assunti</span>
                          <span className="font-medium">180g</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Obiettivo: 200g</span>
                          <span>90%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Grassi</h4>
                        <span className="text-2xl">🥑</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Assunti</span>
                          <span className="font-medium">45g</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Obiettivo: 65g</span>
                          <span>70%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                    <span>📊</span>
                    <span>Progresso Settimanale</span>
                  </h3>
                  <div className="space-y-6">
                    <div className="text-center">
                      <ProgressRing percentage={78} size={120} color="text-blue-500" />
                      <p className="text-sm text-gray-600 mt-2">Obiettivi Raggiunti</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span className="text-sm font-medium">Idratazione</span>
                        </div>
                        <span className="text-sm text-green-600">100%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-600">⚠️</span>
                          <span className="text-sm font-medium">Verdure</span>
                        </div>
                        <span className="text-sm text-yellow-600">75%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600">❌</span>
                          <span className="text-sm font-medium">Zuccheri</span>
                        </div>
                        <span className="text-sm text-red-600">Superato</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cooking Frequency */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                    <span>📈</span>
                    <span>Frequenza di Cucina</span>
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Questa settimana</span>
                        <span className="text-2xl font-bold text-green-600">+23%</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Hai cucinato più spesso rispetto alla settimana scorsa!
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Colazioni preparate</span>
                          <span className="font-medium">6/7</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Pranzi cucinati</span>
                          <span className="font-medium">5/7</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cene preparate</span>
                          <span className="font-medium">7/7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recipe Popularity */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                    <span>🏆</span>
                    <span>Top Ricette del Mese</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Pasta Carbonara', times: 8, rating: 5 },
                      { name: 'Pollo alle Verdure', times: 6, rating: 4.5 },
                      { name: 'Risotto ai Funghi', times: 5, rating: 4.8 },
                      { name: 'Salmone Grigliato', times: 4, rating: 4.2 }
                    ].map((recipe, index) => (
                      <div key={recipe.name} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{recipe.name}</h4>
                            <p className="text-sm text-gray-600">{recipe.times} volte preparata</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium">{recipe.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                  <span>🏅</span>
                  <span>Traguardi Raggiunti</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center border border-purple-100">
                    <div className="text-3xl mb-2">🍳</div>
                    <h4 className="font-semibold text-gray-900">Chef Principiante</h4>
                    <p className="text-sm text-gray-600">50 ricette preparate</p>
                    <div className="mt-3 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full inline-block">
                      Sbloccato
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center border border-purple-100">
                    <div className="text-3xl mb-2">🌟</div>
                    <h4 className="font-semibold text-gray-900">Valutatore Esperto</h4>
                    <p className="text-sm text-gray-600">100 recensioni lasciate</p>
                    <div className="mt-3 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full inline-block">
                      Sbloccato
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-200 opacity-60">
                    <div className="text-3xl mb-2">👨‍🍳</div>
                    <h4 className="font-semibold text-gray-900">Master Chef</h4>
                    <p className="text-sm text-gray-600">200 ricette preparate</p>
                    <div className="mt-3 bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full inline-block">
                      156/200
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
