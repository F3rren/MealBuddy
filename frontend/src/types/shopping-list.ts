// Tipi per il sistema di lista spesa
export type ShoppingCategory = 
  | 'Frutta e Verdura'
  | 'Carne e Pesce'
  | 'Latticini e Uova'
  | 'Cereali e Pasta'
  | 'Pane e Dolci'
  | 'Condimenti e Spezie'
  | 'Bevande'
  | 'Surgelati'
  | 'Conserve'
  | 'Altro';

export type ShoppingPriority = 'bassa' | 'media' | 'alta' | 'urgente';

export type ShoppingStatus = 'pending' | 'in-cart' | 'purchased' | 'unavailable';

export interface ShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  quantity: number;
  unit: string;
  estimatedPrice?: number;
  actualPrice?: number;
  priority: ShoppingPriority;
  status: ShoppingStatus;
  notes?: string;
  isFromRecipe: boolean;
  recipeIds: string[]; // Da quali ricette proviene
  recipeNames: string[]; // Nomi delle ricette
  addedDate: string;
  purchasedDate?: string;
  store?: string;
  brand?: string;
  alternatives?: string[]; // Alternative in caso di indisponibilità
}

export interface ShoppingList {
  id: string;
  name: string;
  description?: string;
  createdDate: string;
  updatedDate: string;
  items: ShoppingItem[];
  totalEstimatedCost: number;
  totalActualCost: number;
  isCompleted: boolean;
  weekPlanId?: string; // Collegamento al piano settimanale
  sharedWith?: string[]; // Email di persone con cui è condivisa
}

export interface ShoppingStats {
  totalItems: number;
  purchasedItems: number;
  pendingItems: number;
  totalEstimatedCost: number;
  totalActualCost: number;
  savingsAmount: number;
  completionPercentage: number;
  categoryBreakdown: Record<ShoppingCategory, {
    count: number;
    estimatedCost: number;
    actualCost: number;
  }>;
  priorityBreakdown: Record<ShoppingPriority, number>;
}

export interface ShoppingFilters {
  category?: ShoppingCategory;
  priority?: ShoppingPriority;
  status?: ShoppingStatus;
  isFromRecipe?: boolean;
  searchTerm?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface ShoppingStore {
  id: string;
  name: string;
  address: string;
  type: 'supermarket' | 'market' | 'specialty' | 'online';
  estimatedTravelTime?: number; // in minuti
  averageRating?: number;
  priceLevel: 'economico' | 'medio' | 'costoso';
  specialties: ShoppingCategory[];
}

export interface ShoppingRecipe {
  id: string;
  name: string;
  servings: number;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
    category: ShoppingCategory;
  }[];
}

export interface GenerateListOptions {
  weekPlanId?: string;
  recipeIds?: string[];
  excludeCategories?: ShoppingCategory[];
  consolidateSimilar?: boolean;
  addPantryBuffer?: boolean;
  preferredStores?: string[];
}
