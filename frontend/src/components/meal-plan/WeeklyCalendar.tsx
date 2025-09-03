import React, { useState, useCallback } from 'react';
import type { DayPlan, PlannedMeal, MealType } from '../../types/meal-plan';

interface WeeklyCalendarProps {
  weekDays: DayPlan[];
  onMealClick: (meal: PlannedMeal) => void;
  onAddMeal: (day: string, mealType: MealType) => void;
  onRemoveMeal: (mealId: string) => void;
  onToggleCompleted: (mealId: string) => void;
}

const MEAL_TYPE_ICONS: Record<MealType, string> = {
  colazione: '🌅',
  pranzo: '☀️',
  cena: '🌙',
  spuntino: '🍎'
};

const MEAL_TYPE_COLORS: Record<MealType, string> = {
  colazione: 'bg-yellow-50 border-yellow-200',
  pranzo: 'bg-orange-50 border-orange-200',
  cena: 'bg-purple-50 border-purple-200',
  spuntino: 'bg-green-50 border-green-200'
};

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  weekDays,
  onMealClick,
  onAddMeal,
  onRemoveMeal,
  onToggleCompleted
}) => {
  const [draggedMeal, setDraggedMeal] = useState<PlannedMeal | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);

  const handleDragStart = useCallback((meal: PlannedMeal) => {
    setDraggedMeal(meal);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedMeal(null);
    setDragOverTarget(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, day: string, mealType: MealType) => {
    e.preventDefault();
    setDragOverTarget(`${day}-${mealType}`);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverTarget(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetDay: string, targetMealType: MealType) => {
    e.preventDefault();
    if (draggedMeal) {
      // TODO: Implementare logica di spostamento meal
      console.log('Moving meal:', draggedMeal.id, 'to', targetDay, targetMealType);
    }
    setDraggedMeal(null);
    setDragOverTarget(null);
  }, [draggedMeal]);

  const formatCalories = (calories: number) => {
    return calories.toLocaleString() + ' cal';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header giorni */}
      <div className="grid grid-cols-7 bg-gradient-to-r from-green-500 to-blue-500">
        {weekDays.map((dayPlan) => (
          <div key={dayPlan.date} className="p-4 text-center text-white">
            <div className="font-semibold text-sm uppercase tracking-wide">
              {dayPlan.day}
            </div>
            <div className={`text-lg font-bold mt-1 ${
              dayPlan.isToday ? 'bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''
            }`}>
              {new Date(dayPlan.date).getDate()}
            </div>
            <div className="text-xs opacity-80 mt-1">
              {formatCalories(dayPlan.totalCalories)}
            </div>
          </div>
        ))}
      </div>

      {/* Griglia pasti */}
      <div className="grid grid-cols-7 divide-x divide-gray-200">
        {weekDays.map((dayPlan) => (
          <div key={dayPlan.date} className="min-h-[600px] bg-gray-50">
            {(['colazione', 'pranzo', 'cena', 'spuntino'] as MealType[]).map((mealType) => (
              <div
                key={`${dayPlan.date}-${mealType}`}
                className={`p-2 border-b border-gray-200 min-h-[140px] ${MEAL_TYPE_COLORS[mealType]} ${
                  dragOverTarget === `${dayPlan.date}-${mealType}` ? 'ring-2 ring-blue-400 bg-blue-50' : ''
                }`}
                onDragOver={(e) => handleDragOver(e, dayPlan.date, mealType)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, dayPlan.date, mealType)}
              >
                {/* Header tipo pasto */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-sm mr-1">{MEAL_TYPE_ICONS[mealType]}</span>
                    <span className="text-xs font-medium text-gray-700 capitalize">
                      {mealType}
                    </span>
                  </div>
                  <button
                    onClick={() => onAddMeal(dayPlan.date, mealType)}
                    className="text-xs text-gray-500 hover:text-green-600 transition-colors"
                    title={`Aggiungi ${mealType}`}
                  >
                    ➕
                  </button>
                </div>

                {/* Lista pasti */}
                <div className="space-y-1">
                  {dayPlan.meals[mealType].map((meal) => (
                    <div
                      key={meal.id}
                      draggable
                      onDragStart={() => handleDragStart(meal)}
                      onDragEnd={handleDragEnd}
                      className={`group relative p-2 bg-white rounded-lg shadow-sm border cursor-move hover:shadow-md transition-all duration-200 ${
                        meal.isCompleted ? 'opacity-60 bg-gray-100' : ''
                      } ${draggedMeal?.id === meal.id ? 'opacity-50 transform rotate-2' : ''}`}
                      onClick={() => onMealClick(meal)}
                    >
                      {/* Immagine ricetta */}
                      <div className="flex items-start space-x-2">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={meal.recipeImage}
                            alt={meal.recipeName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div className="hidden w-full h-full bg-gray-200 items-center justify-center text-lg">
                            🍽️
                          </div>
                        </div>

                        {/* Info ricetta */}
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-medium text-gray-800 line-clamp-2 ${
                            meal.isCompleted ? 'line-through' : ''
                          }`}>
                            {meal.recipeName}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              {meal.servings} porz.
                            </span>
                            {meal.calories && (
                              <span className="text-xs text-gray-500">
                                {meal.calories} cal
                              </span>
                            )}
                          </div>
                          {meal.cookTime && (
                            <div className="text-xs text-gray-400 mt-1">
                              ⏱️ {meal.cookTime}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Azioni hover */}
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompleted(meal.id);
                          }}
                          className={`w-4 h-4 rounded-full text-xs flex items-center justify-center transition-colors ${
                            meal.isCompleted
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gray-200 text-gray-600 hover:bg-green-500 hover:text-white'
                          }`}
                          title={meal.isCompleted ? 'Segna come non completato' : 'Segna come completato'}
                        >
                          ✓
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveMeal(meal.id);
                          }}
                          className="w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                          title="Rimuovi pasto"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Note */}
                      {meal.notes && (
                        <div className="text-xs text-gray-500 mt-1 italic">
                          💭 {meal.notes}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Placeholder vuoto */}
                  {dayPlan.meals[mealType].length === 0 && (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() => onAddMeal(dayPlan.date, mealType)}
                    >
                      <div className="text-gray-400 text-xs">
                        Trascina una ricetta qui<br />o clicca per aggiungere
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
