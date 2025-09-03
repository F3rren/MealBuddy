// Tipi per il sistema di ricette
export type Difficulty = 'Facile' | 'Media' | 'Difficile';

export type RecipeCategory = 
  | 'Antipasti'
  | 'Primi Piatti' 
  | 'Secondi Piatti'
  | 'Contorni'
  | 'Dolci'
  | 'Bevande'
  | 'Colazione'
  | 'Snack';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  cookTime: string;
  prepTime: string;
  difficulty: Difficulty;
  rating: number;
  calories: number;
  servings: number;
  category: RecipeCategory;
  tags: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutritionInfo: NutritionInfo;
  author: string;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface Instruction {
  id: string;
  step: number;
  description: string;
  image?: string;
  timer?: number; // in minuti
}

export interface NutritionInfo {
  calories: number;
  protein: number; // grammi
  carbs: number; // grammi
  fat: number; // grammi
  fiber: number; // grammi
  sugar: number; // grammi
  sodium: number; // mg
}

export interface RecipeFilters {
  category?: RecipeCategory;
  difficulty?: Difficulty;
  maxCookTime?: number;
  minRating?: number;
  tags?: string[];
  searchTerm?: string;
}

export interface RecipeSortOption {
  field: 'name' | 'rating' | 'cookTime' | 'calories' | 'createdAt';
  direction: 'asc' | 'desc';
}
