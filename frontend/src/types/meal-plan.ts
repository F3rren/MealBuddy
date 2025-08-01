// Tipi per il sistema di pianificazione pasti
export type MealType = 'colazione' | 'pranzo' | 'cena' | 'spuntino';

export type WeekDay = 'lunedì' | 'martedì' | 'mercoledì' | 'giovedì' | 'venerdì' | 'sabato' | 'domenica';

export interface PlannedMeal {
  id: string;
  recipeId: string;
  recipeName: string;
  recipeImage: string;
  mealType: MealType;
  day: WeekDay;
  date: string; // YYYY-MM-DD format
  servings: number;
  notes?: string;
  prepTime?: string;
  cookTime?: string;
  calories?: number;
  isCompleted?: boolean;
}

export interface MealPlanWeek {
  weekStart: string; // YYYY-MM-DD format del lunedì
  weekEnd: string; // YYYY-MM-DD format della domenica
  meals: PlannedMeal[];
}

export interface DayPlan {
  date: string;
  day: WeekDay;
  meals: {
    colazione: PlannedMeal[];
    pranzo: PlannedMeal[];
    cena: PlannedMeal[];
    spuntino: PlannedMeal[];
  };
  totalCalories: number;
  isToday: boolean;
}

export interface WeekStats {
  totalMeals: number;
  completedMeals: number;
  totalCalories: number;
  averageCaloriesPerDay: number;
  mealTypeDistribution: {
    colazione: number;
    pranzo: number;
    cena: number;
    spuntino: number;
  };
}

export interface MealPlanFilters {
  mealType?: MealType;
  showCompleted?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface RecipeQuickAdd {
  id: string;
  name: string;
  image: string;
  cookTime: string;
  difficulty: string;
  calories: number;
  category: string;
  tags: string[];
}
