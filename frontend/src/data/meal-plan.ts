import type { PlannedMeal, DayPlan, WeekStats, WeekDay, MealType } from '../types/meal-plan';
import { MOCK_RECIPES } from './recipes';

// Utilità per le date
export const getWeekDates = (startDate?: Date): { start: Date; end: Date; days: Date[] } => {
  const today = startDate || new Date();
  const monday = new Date(today);
  const dayOfWeek = monday.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Lunedì = 1, Domenica = 0
  monday.setDate(monday.getDate() + difference);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    days.push(day);
  }
  
  return { start: monday, end: sunday, days };
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getWeekDay = (date: Date): WeekDay => {
  const days: WeekDay[] = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  return days[date.getDay()];
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return formatDate(date) === formatDate(today);
};

// Dati mock per i pasti pianificati
export const MOCK_PLANNED_MEALS: PlannedMeal[] = [
  // Lunedì
  {
    id: 'pm-1',
    recipeId: '6',
    recipeName: 'Pancakes Americani',
    recipeImage: MOCK_RECIPES[5].image,
    mealType: 'colazione',
    day: 'lunedì',
    date: formatDate(getWeekDates().days[0]),
    servings: 2,
    cookTime: '20 min',
    calories: 450,
    isCompleted: true
  },
  {
    id: 'pm-2',
    recipeId: '1',
    recipeName: 'Pasta alla Carbonara',
    recipeImage: MOCK_RECIPES[0].image,
    mealType: 'pranzo',
    day: 'lunedì',
    date: formatDate(getWeekDates().days[0]),
    servings: 4,
    cookTime: '20 min',
    calories: 650,
    isCompleted: true
  },
  {
    id: 'pm-3',
    recipeId: '2',
    recipeName: 'Pizza Margherita',
    recipeImage: MOCK_RECIPES[1].image,
    mealType: 'cena',
    day: 'lunedì',
    date: formatDate(getWeekDates().days[0]),
    servings: 2,
    cookTime: '45 min',
    calories: 800,
    isCompleted: false
  },

  // Martedì
  {
    id: 'pm-4',
    recipeId: '6',
    recipeName: 'Pancakes Americani',
    recipeImage: MOCK_RECIPES[5].image,
    mealType: 'colazione',
    day: 'martedì',
    date: formatDate(getWeekDates().days[1]),
    servings: 2,
    cookTime: '20 min',
    calories: 450,
    isCompleted: false
  },
  {
    id: 'pm-5',
    recipeId: '4',
    recipeName: 'Insalata Caesar',
    recipeImage: MOCK_RECIPES[3].image,
    mealType: 'pranzo',
    day: 'martedì',
    date: formatDate(getWeekDates().days[1]),
    servings: 2,
    cookTime: '15 min',
    calories: 320,
    isCompleted: false
  },
  {
    id: 'pm-6',
    recipeId: '3',
    recipeName: 'Risotto ai Funghi Porcini',
    recipeImage: MOCK_RECIPES[2].image,
    mealType: 'cena',
    day: 'martedì',
    date: formatDate(getWeekDates().days[1]),
    servings: 4,
    cookTime: '35 min',
    calories: 420,
    isCompleted: false
  },

  // Mercoledì
  {
    id: 'pm-7',
    recipeId: '6',
    recipeName: 'Pancakes Americani',
    recipeImage: MOCK_RECIPES[5].image,
    mealType: 'colazione',
    day: 'mercoledì',
    date: formatDate(getWeekDates().days[2]),
    servings: 1,
    notes: 'Versione light con meno sciroppo',
    cookTime: '20 min',
    calories: 350,
    isCompleted: false
  },

  // Giovedì
  {
    id: 'pm-8',
    recipeId: '4',
    recipeName: 'Insalata Caesar',
    recipeImage: MOCK_RECIPES[3].image,
    mealType: 'pranzo',
    day: 'giovedì',
    date: formatDate(getWeekDates().days[3]),
    servings: 1,
    cookTime: '15 min',
    calories: 320,
    isCompleted: false
  },

  // Venerdì
  {
    id: 'pm-9',
    recipeId: '5',
    recipeName: 'Tiramisù',
    recipeImage: MOCK_RECIPES[4].image,
    mealType: 'spuntino',
    day: 'venerdì',
    date: formatDate(getWeekDates().days[4]),
    servings: 1,
    notes: 'Dopo cena, per celebrare il weekend!',
    cookTime: '30 min',
    calories: 580,
    isCompleted: false
  },

  // Domenica
  {
    id: 'pm-10',
    recipeId: '2',
    recipeName: 'Pizza Margherita',
    recipeImage: MOCK_RECIPES[1].image,
    mealType: 'cena',
    day: 'domenica',
    date: formatDate(getWeekDates().days[6]),
    servings: 2,
    notes: 'Pizza della domenica in famiglia',
    cookTime: '45 min',
    calories: 800,
    isCompleted: false
  }
];

// Funzioni di utilità
export const createDayPlan = (date: Date, meals: PlannedMeal[]): DayPlan => {
  const dateStr = formatDate(date);
  const dayMeals = meals.filter(meal => meal.date === dateStr);
  
  const mealsByType = {
    colazione: dayMeals.filter(meal => meal.mealType === 'colazione'),
    pranzo: dayMeals.filter(meal => meal.mealType === 'pranzo'),
    cena: dayMeals.filter(meal => meal.mealType === 'cena'),
    spuntino: dayMeals.filter(meal => meal.mealType === 'spuntino')
  };

  const totalCalories = dayMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);

  return {
    date: dateStr,
    day: getWeekDay(date),
    meals: mealsByType,
    totalCalories,
    isToday: isToday(date)
  };
};

export const createWeekPlan = (meals: PlannedMeal[] = MOCK_PLANNED_MEALS): DayPlan[] => {
  const { days } = getWeekDates();
  return days.map(day => createDayPlan(day, meals));
};

export const calculateWeekStats = (weekDays: DayPlan[]): WeekStats => {
  const allMeals = weekDays.flatMap(day => Object.values(day.meals).flat());
  
  const totalMeals = allMeals.length;
  const completedMeals = allMeals.filter(meal => meal.isCompleted).length;
  const totalCalories = allMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const averageCaloriesPerDay = Math.round(totalCalories / 7);

  const mealTypeDistribution = {
    colazione: 0,
    pranzo: 0,
    cena: 0,
    spuntino: 0
  };

  allMeals.forEach(meal => {
    mealTypeDistribution[meal.mealType]++;
  });

  return {
    totalMeals,
    completedMeals,
    totalCalories,
    averageCaloriesPerDay,
    mealTypeDistribution
  };
};

// Funzioni per manipolare i pasti
export const addMealToPlan = (
  meals: PlannedMeal[], 
  recipeId: string, 
  recipeName: string, 
  recipeImage: string,
  date: string, 
  mealType: MealType, 
  servings: number = 2,
  calories?: number,
  cookTime?: string,
  notes?: string
): PlannedMeal[] => {
  const newMeal: PlannedMeal = {
    id: `pm-${Date.now()}`,
    recipeId,
    recipeName,
    recipeImage,
    mealType,
    day: getWeekDay(new Date(date)),
    date,
    servings,
    calories,
    cookTime,
    notes,
    isCompleted: false
  };

  return [...meals, newMeal];
};

export const removeMealFromPlan = (meals: PlannedMeal[], mealId: string): PlannedMeal[] => {
  return meals.filter(meal => meal.id !== mealId);
};

export const toggleMealCompleted = (meals: PlannedMeal[], mealId: string): PlannedMeal[] => {
  return meals.map(meal => 
    meal.id === mealId 
      ? { ...meal, isCompleted: !meal.isCompleted }
      : meal
  );
};

export const updateMealServings = (meals: PlannedMeal[], mealId: string, servings: number): PlannedMeal[] => {
  return meals.map(meal => 
    meal.id === mealId 
      ? { ...meal, servings }
      : meal
  );
};

export const moveMeal = (
  meals: PlannedMeal[], 
  mealId: string, 
  newDate: string, 
  newMealType: MealType
): PlannedMeal[] => {
  return meals.map(meal => 
    meal.id === mealId 
      ? { 
          ...meal, 
          date: newDate, 
          day: getWeekDay(new Date(newDate)),
          mealType: newMealType 
        }
      : meal
  );
};

// Funzioni per la navigazione settimanale
export const getNextWeek = (currentWeekStart: Date): Date => {
  const nextWeek = new Date(currentWeekStart);
  nextWeek.setDate(currentWeekStart.getDate() + 7);
  return nextWeek;
};

export const getPreviousWeek = (currentWeekStart: Date): Date => {
  const prevWeek = new Date(currentWeekStart);
  prevWeek.setDate(currentWeekStart.getDate() - 7);
  return prevWeek;
};

export const getWeekLabel = (weekStart: Date): string => {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  const startDay = weekStart.getDate();
  const endDay = weekEnd.getDate();
  const month = weekStart.toLocaleDateString('it-IT', { month: 'long' });
  const year = weekStart.getFullYear();
  
  if (weekStart.getMonth() === weekEnd.getMonth()) {
    return `${startDay}-${endDay} ${month} ${year}`;
  } else {
    const startMonth = weekStart.toLocaleDateString('it-IT', { month: 'short' });
    const endMonth = weekEnd.toLocaleDateString('it-IT', { month: 'short' });
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
  }
};
