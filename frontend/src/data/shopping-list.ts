import type { ShoppingItem } from '../types/shopping-list';

export const mockShoppingItems: ShoppingItem[] = [
  // Frutta e Verdura
  {
    id: '1',
    name: 'Pomodori San Marzano',
    category: 'Frutta e Verdura',
    quantity: 1,
    unit: 'kg',
    status: 'pending',
    priority: 'alta',
    estimatedPrice: 3.50,
    actualPrice: undefined,
    notes: 'Per la pasta al sugo',
    isFromRecipe: true,
    recipeIds: ['recipe-1'],
    recipeNames: ['Spaghetti al pomodoro'],
    addedDate: '2024-01-15',
    purchasedDate: undefined
  },
  {
    id: '2',
    name: 'Basilico fresco',
    category: 'Frutta e Verdura',
    quantity: 1,
    unit: 'mazzo',
    status: 'purchased',
    priority: 'media',
    estimatedPrice: 1.50,
    actualPrice: 1.20,
    notes: 'Biologico se possibile',
    isFromRecipe: true,
    recipeIds: ['recipe-1'],
    recipeNames: ['Spaghetti al pomodoro'],
    addedDate: '2024-01-15',
    purchasedDate: '2024-01-16'
  },
  {
    id: '3',
    name: 'Cipolle rosse',
    category: 'Frutta e Verdura',
    quantity: 500,
    unit: 'g',
    status: 'in-cart',
    priority: 'media',
    estimatedPrice: 2.00,
    actualPrice: undefined,
    notes: 'Per la caponata',
    isFromRecipe: true,
    recipeIds: ['recipe-2'],
    recipeNames: ['Caponata siciliana'],
    addedDate: '2024-01-15',
    purchasedDate: undefined
  },
  {
    id: '4',
    name: 'Melanzane',
    category: 'Frutta e Verdura',
    quantity: 2,
    unit: 'pz',
    status: 'pending',
    priority: 'alta',
    estimatedPrice: 4.00,
    actualPrice: undefined,
    notes: 'Non troppo mature',
    isFromRecipe: true,
    recipeIds: ['recipe-2'],
    recipeNames: ['Caponata siciliana'],
    addedDate: '2024-01-15',
    purchasedDate: undefined
  },

  // Carne e Pesce
  {
    id: '5',
    name: 'Petto di pollo',
    category: 'Carne e Pesce',
    quantity: 600,
    unit: 'g',
    status: 'pending',
    priority: 'urgente',
    estimatedPrice: 8.00,
    actualPrice: undefined,
    notes: 'Biologico, senza pelle',
    isFromRecipe: true,
    recipeIds: ['recipe-3'],
    recipeNames: ['Pollo al limone'],
    addedDate: '2024-01-14',
    purchasedDate: undefined
  },
  {
    id: '6',
    name: 'Salmone fresco',
    category: 'Carne e Pesce',
    quantity: 400,
    unit: 'g',
    status: 'unavailable',
    priority: 'media',
    estimatedPrice: 12.00,
    actualPrice: undefined,
    notes: 'Non disponibile oggi, riprovare domani',
    isFromRecipe: true,
    recipeIds: ['recipe-4'],
    recipeNames: ['Salmone in crosta'],
    addedDate: '2024-01-13',
    purchasedDate: undefined
  },

  // Latticini e Uova
  {
    id: '7',
    name: 'Mozzarella di bufala',
    category: 'Latticini e Uova',
    quantity: 250,
    unit: 'g',
    status: 'purchased',
    priority: 'alta',
    estimatedPrice: 4.50,
    actualPrice: 4.20,
    notes: 'DOP campana',
    isFromRecipe: true,
    recipeIds: ['recipe-1'],
    recipeNames: ['Spaghetti al pomodoro'],
    addedDate: '2024-01-15',
    purchasedDate: '2024-01-16'
  },
  {
    id: '8',
    name: 'Uova fresche',
    category: 'Latticini e Uova',
    quantity: 12,
    unit: 'pz',
    status: 'pending',
    priority: 'media',
    estimatedPrice: 3.50,
    actualPrice: undefined,
    notes: 'Da allevamento a terra',
    isFromRecipe: true,
    recipeIds: ['recipe-5'],
    recipeNames: ['Carbonara'],
    addedDate: '2024-01-15',
    purchasedDate: undefined
  },
  {
    id: '9',
    name: 'Parmigiano Reggiano',
    category: 'Latticini e Uova',
    quantity: 200,
    unit: 'g',
    status: 'in-cart',
    priority: 'bassa',
    estimatedPrice: 6.00,
    actualPrice: undefined,
    notes: '24 mesi di stagionatura',
    isFromRecipe: true,
    recipeIds: ['recipe-1', 'recipe-6'],
    recipeNames: ['Spaghetti al pomodoro', 'Risotto parmigiano'],
    addedDate: '2024-01-14',
    purchasedDate: undefined
  },

  // Cereali e Pasta
  {
    id: '10',
    name: 'Spaghetti di grano duro',
    category: 'Cereali e Pasta',
    quantity: 500,
    unit: 'g',
    status: 'purchased',
    priority: 'media',
    estimatedPrice: 1.50,
    actualPrice: 1.35,
    notes: 'Marca italiana',
    isFromRecipe: true,
    recipeIds: ['recipe-1'],
    recipeNames: ['Spaghetti al pomodoro'],
    addedDate: '2024-01-15',
    purchasedDate: '2024-01-16'
  },
  {
    id: '11',
    name: 'Riso Arborio',
    category: 'Cereali e Pasta',
    quantity: 500,
    unit: 'g',
    status: 'pending',
    priority: 'bassa',
    estimatedPrice: 2.50,
    actualPrice: undefined,
    notes: 'Per risotto ai funghi',
    isFromRecipe: true,
    recipeIds: ['recipe-7'],
    recipeNames: ['Risotto ai funghi'],
    addedDate: '2024-01-13',
    purchasedDate: undefined
  },

  // Pane e Dolci
  {
    id: '12',
    name: 'Pane integrale',
    category: 'Pane e Dolci',
    quantity: 1,
    unit: 'pz',
    status: 'pending',
    priority: 'media',
    estimatedPrice: 2.00,
    actualPrice: undefined,
    notes: 'Fresco del giorno',
    isFromRecipe: false,
    recipeIds: [],
    recipeNames: [],
    addedDate: '2024-01-16',
    purchasedDate: undefined
  },

  // Condimenti e Spezie
  {
    id: '13',
    name: 'Olio extravergine di oliva',
    category: 'Condimenti e Spezie',
    quantity: 500,
    unit: 'ml',
    status: 'in-cart',
    priority: 'media',
    estimatedPrice: 8.00,
    actualPrice: undefined,
    notes: 'Spremitura a freddo',
    isFromRecipe: true,
    recipeIds: ['recipe-1', 'recipe-2'],
    recipeNames: ['Spaghetti al pomodoro', 'Caponata siciliana'],
    addedDate: '2024-01-12',
    purchasedDate: undefined
  },
  {
    id: '14',
    name: 'Pepe nero macinato',
    category: 'Condimenti e Spezie',
    quantity: 50,
    unit: 'g',
    status: 'pending',
    priority: 'bassa',
    estimatedPrice: 3.00,
    actualPrice: undefined,
    notes: 'In grani da macinare',
    isFromRecipe: true,
    recipeIds: ['recipe-3'],
    recipeNames: ['Pollo al limone'],
    addedDate: '2024-01-14',
    purchasedDate: undefined
  },

  // Bevande
  {
    id: '15',
    name: 'Acqua naturale',
    category: 'Bevande',
    quantity: 6,
    unit: 'bottiglie',
    status: 'purchased',
    priority: 'urgente',
    estimatedPrice: 3.00,
    actualPrice: 2.70,
    notes: '1.5L ciascuna',
    isFromRecipe: false,
    recipeIds: [],
    recipeNames: [],
    addedDate: '2024-01-15',
    purchasedDate: '2024-01-16'
  },
  {
    id: '16',
    name: 'Vino rosso da cucina',
    category: 'Bevande',
    quantity: 1,
    unit: 'bottiglia',
    status: 'pending',
    priority: 'bassa',
    estimatedPrice: 5.00,
    actualPrice: undefined,
    notes: 'Per sfumare la carne',
    isFromRecipe: true,
    recipeIds: ['recipe-3'],
    recipeNames: ['Pollo al limone'],
    addedDate: '2024-01-13',
    purchasedDate: undefined
  },

  // Surgelati
  {
    id: '17',
    name: 'Piselli surgelati',
    category: 'Surgelati',
    quantity: 400,
    unit: 'g',
    status: 'in-cart',
    priority: 'media',
    estimatedPrice: 2.50,
    actualPrice: undefined,
    notes: 'Senza conservanti',
    isFromRecipe: true,
    recipeIds: ['recipe-7'],
    recipeNames: ['Risotto ai funghi'],
    addedDate: '2024-01-14',
    purchasedDate: undefined
  },

  // Conserve
  {
    id: '18',
    name: 'Pelati in scatola',
    category: 'Conserve',
    quantity: 2,
    unit: 'scatole',
    status: 'purchased',
    priority: 'media',
    estimatedPrice: 2.80,
    actualPrice: 2.60,
    notes: 'San Marzano DOP',
    isFromRecipe: true,
    recipeIds: ['recipe-1'],
    recipeNames: ['Spaghetti al pomodoro'],
    addedDate: '2024-01-15',
    purchasedDate: '2024-01-16'
  },

  // Altro
  {
    id: '19',
    name: 'Detersivo piatti',
    category: 'Altro',
    quantity: 1,
    unit: 'bottiglia',
    status: 'pending',
    priority: 'bassa',
    estimatedPrice: 3.50,
    actualPrice: undefined,
    notes: 'Ecologico',
    isFromRecipe: false,
    recipeIds: [],
    recipeNames: [],
    addedDate: '2024-01-12',
    purchasedDate: undefined
  },
  {
    id: '20',
    name: 'Carta forno',
    category: 'Altro',
    quantity: 1,
    unit: 'rotolo',
    status: 'pending',
    priority: 'media',
    estimatedPrice: 2.00,
    actualPrice: undefined,
    notes: 'Antiaderente',
    isFromRecipe: true,
    recipeIds: ['recipe-5'],
    recipeNames: ['Carbonara'],
    addedDate: '2024-01-14',
    purchasedDate: undefined
  }
];

// Utility functions per la gestione della shopping list
export const getItemsByCategory = (items: ShoppingItem[]) => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);
};

export const getShoppingStats = (items: ShoppingItem[]) => {
  const total = items.length;
  const completed = items.filter(item => item.status === 'purchased').length;
  const pending = items.filter(item => item.status === 'pending').length;
  const inCart = items.filter(item => item.status === 'in-cart').length;
  const unavailable = items.filter(item => item.status === 'unavailable').length;

  const totalEstimated = items.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
  const totalActual = items.reduce((sum, item) => sum + (item.actualPrice || 0), 0);

  return {
    total,
    completed,
    pending,
    inCart,
    unavailable,
    completionPercentage: total > 0 ? (completed / total) * 100 : 0,
    totalEstimated,
    totalActual,
    savings: totalEstimated - totalActual
  };
};

export const generateShoppingListFromMeals = (mealIds: string[]) => {
  // Questa funzione sarà implementata per generare automaticamente 
  // la lista della spesa dai piani pasto
  console.log('Generating shopping list from meals:', mealIds);
  return [];
};
