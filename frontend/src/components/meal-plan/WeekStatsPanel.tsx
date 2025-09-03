import React from 'react';
import type { WeekStats, DayPlan } from '../../types/meal-plan';

interface WeekStatsProps {
  weekStats: WeekStats;
  weekDays: DayPlan[];
  onGenerateShoppingList: () => void;
}

const WeekStatsPanel: React.FC<WeekStatsProps> = ({
  weekStats,
  weekDays,
  onGenerateShoppingList
}) => {
  const completionPercentage = weekStats.totalMeals > 0 
    ? Math.round((weekStats.completedMeals / weekStats.totalMeals) * 100)
    : 0;

  const getMealTypeIcon = (mealType: string) => {
    const icons: Record<string, string> = {
      colazione: '🌅',
      pranzo: '☀️',
      cena: '🌙',
      spuntino: '🍎'
    };
    return icons[mealType] || '🍽️';
  };

  const formatCalories = (calories: number) => {
    return calories.toLocaleString('it-IT');
  };

  return (
    <div className="space-y-6">
      {/* Statistiche Generali */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-xl mr-2">📊</span>
          Statistiche Settimanali
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {weekStats.totalMeals}
            </div>
            <div className="text-sm text-gray-600">Pasti Pianificati</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {weekStats.completedMeals}
            </div>
            <div className="text-sm text-gray-600">Completati</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {formatCalories(weekStats.totalCalories)}
            </div>
            <div className="text-sm text-gray-600">Calorie Totali</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {formatCalories(weekStats.averageCaloriesPerDay)}
            </div>
            <div className="text-sm text-gray-600">Media Giornaliera</div>
          </div>
        </div>

        {/* Barra di completamento */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Completamento Settimana
            </span>
            <span className="text-sm text-gray-600">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Distribuzione Pasti */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-xl mr-2">🥗</span>
          Distribuzione Pasti
        </h3>
        
        <div className="space-y-3">
          {Object.entries(weekStats.mealTypeDistribution).map(([mealType, count]) => {
            const percentage = weekStats.totalMeals > 0 
              ? Math.round((count / weekStats.totalMeals) * 100)
              : 0;
            
            return (
              <div key={mealType} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{getMealTypeIcon(mealType)}</span>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {mealType}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Riepilogo Giornaliero */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-xl mr-2">📅</span>
          Riepilogo Giornaliero
        </h3>
        
        <div className="space-y-2">
          {weekDays.map((day) => {
            const dayMealsCount = Object.values(day.meals).reduce(
              (acc, meals) => acc + meals.length, 0
            );
            const completedCount = Object.values(day.meals).reduce(
              (acc, meals) => acc + meals.filter(meal => meal.isCompleted).length, 0
            );
            
            return (
              <div 
                key={day.date}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  day.isToday ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    day.isToday ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className={`text-sm font-medium capitalize ${
                    day.isToday ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    {day.day}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>
                    {completedCount}/{dayMealsCount} pasti
                  </span>
                  <span>
                    {formatCalories(day.totalCalories)} cal
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Azioni Rapide */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-xl mr-2">⚡</span>
          Azioni Rapide
        </h3>
        
        <div className="space-y-3">
          <button
            onClick={onGenerateShoppingList}
            className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <span className="text-lg mr-2">🛒</span>
            Genera Lista Spesa
          </button>
          
          <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <span className="text-lg mr-2">📱</span>
            Condividi Piano
          </button>
          
          <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <span className="text-lg mr-2">📊</span>
            Analisi Nutrizionale
          </button>
        </div>
      </div>

      {/* Suggerimenti */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <span className="text-xl mr-2">💡</span>
          Suggerimenti
        </h3>
        
        <div className="space-y-2 text-sm text-gray-700">
          {weekStats.totalMeals === 0 && (
            <p>• Inizia pianificando la colazione per domani</p>
          )}
          {weekStats.averageCaloriesPerDay < 1500 && (
            <p>• Le calorie giornaliere sembrano basse, considera di aggiungere spuntini</p>
          )}
          {weekStats.averageCaloriesPerDay > 2500 && (
            <p>• Le calorie sono elevate, potresti bilanciare con pasti più leggeri</p>
          )}
          {weekStats.mealTypeDistribution.colazione < 3 && (
            <p>• Non dimenticare la colazione! È il pasto più importante della giornata</p>
          )}
          {completionPercentage >= 80 && (
            <p>• Ottimo lavoro! Stai seguendo bene il tuo piano alimentare</p>
          )}
          {weekStats.totalMeals > 0 && completionPercentage < 50 && (
            <p>• Prova a impostare promemoria per i pasti pianificati</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeekStatsPanel;
