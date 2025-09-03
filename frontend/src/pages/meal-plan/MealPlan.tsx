import React, { useState, useMemo, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import WeeklyCalendar from '../../components/meal-plan/WeeklyCalendar';
import QuickRecipeSelector from '../../components/meal-plan/QuickRecipeSelector';
import WeekStatsPanel from '../../components/meal-plan/WeekStatsPanel';
import type { PlannedMeal, MealType } from '../../types/meal-plan';
import type { Recipe } from '../../types/recipe';
import { MOCK_RECIPES } from '../../data/recipes';
import {
  MOCK_PLANNED_MEALS,
  calculateWeekStats,
  addMealToPlan,
  removeMealFromPlan,
  toggleMealCompleted,
  getWeekDates,
  getNextWeek,
  getPreviousWeek,
  getWeekLabel,
  formatDate
} from '../../data/meal-plan';

const MealPlanPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Stati per la pianificazione
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekDates().start);
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>(MOCK_PLANNED_MEALS);
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    mealType: MealType;
  } | null>(null);
  const [showStats, setShowStats] = useState(true);

  // Calcolo dei dati della settimana corrente
  const weekDays = useMemo(() => {
    const { days } = getWeekDates(currentWeekStart);
    return days.map(day => {
      const dateStr = formatDate(day);
      const dayMeals = plannedMeals.filter(meal => meal.date === dateStr);
      
      const mealsByType = {
        colazione: dayMeals.filter(meal => meal.mealType === 'colazione'),
        pranzo: dayMeals.filter(meal => meal.mealType === 'pranzo'),
        cena: dayMeals.filter(meal => meal.mealType === 'cena'),
        spuntino: dayMeals.filter(meal => meal.mealType === 'spuntino')
      };

      const totalCalories = dayMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
      const isToday = formatDate(day) === formatDate(new Date());

      return {
        date: dateStr,
        day: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'][day.getDay()] as any,
        meals: mealsByType,
        totalCalories,
        isToday
      };
    });
  }, [currentWeekStart, plannedMeals]);

  const weekStats = useMemo(() => calculateWeekStats(weekDays), [weekDays]);

  // Handlers
  const handleMealClick = useCallback((meal: PlannedMeal) => {
    console.log('Clicked meal:', meal.recipeName);
    // TODO: Aprire modal dettagli pasto
  }, []);

  const handleAddMeal = useCallback((date: string, mealType: MealType) => {
    setSelectedSlot({ date, mealType });
    setShowRecipeSelector(true);
  }, []);

  const handleRemoveMeal = useCallback((mealId: string) => {
    setPlannedMeals(prev => removeMealFromPlan(prev, mealId));
  }, []);

  const handleToggleCompleted = useCallback((mealId: string) => {
    setPlannedMeals(prev => toggleMealCompleted(prev, mealId));
  }, []);

  const handleSelectRecipe = useCallback((recipe: Recipe, servings: number) => {
    if (selectedSlot) {
      const newMeals = addMealToPlan(
        plannedMeals,
        recipe.id,
        recipe.name,
        recipe.image,
        selectedSlot.date,
        selectedSlot.mealType,
        servings,
        recipe.calories,
        recipe.cookTime
      );
      setPlannedMeals(newMeals);
    }
    setShowRecipeSelector(false);
    setSelectedSlot(null);
  }, [plannedMeals, selectedSlot]);

  const handleGenerateShoppingList = useCallback(() => {
    console.log('Generating shopping list for week...');
    // TODO: Implementare generazione lista spesa
  }, []);

  const navigateWeek = useCallback((direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => 
      direction === 'next' ? getNextWeek(prev) : getPreviousWeek(prev)
    );
  }, []);

  const goToCurrentWeek = useCallback(() => {
    setCurrentWeekStart(getWeekDates().start);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Accesso Richiesto
        </h2>
        <p className="text-gray-600 mb-6">
          Effettua l'accesso per pianificare i tuoi pasti settimanali
        </p>
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
          Vai al Login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              📅 Pianificazione Pasti
            </h1>
            <p className="text-lg opacity-90">
              Organizza i tuoi pasti per la settimana
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowStats(!showStats)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white/30 ${
                showStats
                  ? 'bg-white text-green-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              📊 Statistiche
            </button>
            <button
              onClick={() => setShowRecipeSelector(true)}
              className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30"
            >
              ➕ Aggiungi Ricetta
            </button>
          </div>
        </div>
      </div>

      {/* Navigazione Settimana */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWeek('prev')}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← Settimana Precedente
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              {getWeekLabel(currentWeekStart)}
            </h2>
            <button
              onClick={goToCurrentWeek}
              className="text-sm text-green-600 hover:text-green-700 transition-colors"
            >
              Vai a questa settimana
            </button>
          </div>
          
          <button
            onClick={() => navigateWeek('next')}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Settimana Successiva →
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${showStats ? 'lg:grid-cols-4' : 'lg:grid-cols-1'}`}>
        {/* Calendario */}
        <div className={showStats ? 'lg:col-span-3' : 'lg:col-span-1'}>
          <WeeklyCalendar
            weekDays={weekDays}
            onMealClick={handleMealClick}
            onAddMeal={handleAddMeal}
            onRemoveMeal={handleRemoveMeal}
            onToggleCompleted={handleToggleCompleted}
          />
        </div>

        {/* Sidebar Statistiche */}
        {showStats && (
          <div className="lg:col-span-1">
            <WeekStatsPanel
              weekStats={weekStats}
              weekDays={weekDays}
              onGenerateShoppingList={handleGenerateShoppingList}
            />
          </div>
        )}
      </div>

      {/* Modal Selezione Ricetta */}
      {showRecipeSelector && (
        <QuickRecipeSelector
          recipes={MOCK_RECIPES}
          onSelectRecipe={handleSelectRecipe}
          onClose={() => {
            setShowRecipeSelector(false);
            setSelectedSlot(null);
          }}
          targetMealType={selectedSlot?.mealType}
          targetDate={selectedSlot?.date}
        />
      )}

      {/* Riepilogo Quick Stats Mobile */}
      <div className="md:hidden bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Riepilogo Settimana
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {weekStats.totalMeals}
            </div>
            <div className="text-xs text-gray-600">Pasti</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {weekStats.completedMeals}
            </div>
            <div className="text-xs text-gray-600">Completati</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanPage;
