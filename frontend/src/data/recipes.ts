import type { Recipe } from '../types/recipe';
import { getFoodImageByName } from '../hooks/useFoodImages';

// Dati mock per le ricette - sostituisci con chiamate API reali
export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Pasta alla Carbonara',
    description: 'Un classico della cucina italiana, cremosa e saporita con guanciale, uova e pecorino.',
    image: getFoodImageByName('Pasta alla Carbonara'),
    cookTime: '20 min',
    prepTime: '10 min',
    difficulty: 'Facile',
    rating: 4.8,
    calories: 650,
    servings: 4,
    category: 'Primi Piatti',
    tags: ['Italiana', 'Pasta', 'Veloce', 'Comfort Food'],
    ingredients: [
      { id: '1', name: 'Spaghetti', quantity: 400, unit: 'g' },
      { id: '2', name: 'Guanciale', quantity: 150, unit: 'g' },
      { id: '3', name: 'Uova', quantity: 3, unit: 'pz', notes: 'solo tuorli' },
      { id: '4', name: 'Pecorino Romano', quantity: 80, unit: 'g', notes: 'grattugiato' },
      { id: '5', name: 'Pepe nero', quantity: 1, unit: 'pizzico' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Metti a bollire abbondante acqua salata per la pasta.' },
      { id: '2', step: 2, description: 'Taglia il guanciale a cubetti e fallo rosolare in padella.', timer: 5 },
      { id: '3', step: 3, description: 'In una ciotola, sbatti i tuorli con il pecorino e il pepe.' },
      { id: '4', step: 4, description: 'Cuoci la pasta al dente e scolala, conservando l\'acqua di cottura.', timer: 10 },
      { id: '5', step: 5, description: 'Mescola velocemente la pasta con il composto di uova fuori dal fuoco.' }
    ],
    nutritionInfo: {
      calories: 650,
      protein: 28,
      carbs: 75,
      fat: 25,
      fiber: 3,
      sugar: 2,
      sodium: 580
    },
    author: 'Chef Marco',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    description: 'La pizza più amata al mondo con pomodoro San Marzano, mozzarella di bufala e basilico fresco.',
    image: getFoodImageByName('Pizza Margherita'),
    cookTime: '45 min',
    prepTime: '2 ore',
    difficulty: 'Media',
    rating: 4.9,
    calories: 800,
    servings: 2,
    category: 'Secondi Piatti',
    tags: ['Italiana', 'Pizza', 'Vegetariana', 'Lievitati'],
    ingredients: [
      { id: '1', name: 'Farina 00', quantity: 500, unit: 'g' },
      { id: '2', name: 'Acqua', quantity: 300, unit: 'ml' },
      { id: '3', name: 'Lievito di birra', quantity: 3, unit: 'g' },
      { id: '4', name: 'Sale', quantity: 10, unit: 'g' },
      { id: '5', name: 'Pomodori San Marzano', quantity: 400, unit: 'g' },
      { id: '6', name: 'Mozzarella di bufala', quantity: 250, unit: 'g' },
      { id: '7', name: 'Basilico fresco', quantity: 1, unit: 'mazzo' },
      { id: '8', name: 'Olio extravergine', quantity: 2, unit: 'cucchiai' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Prepara l\'impasto mescolando farina, acqua, lievito e sale.', timer: 15 },
      { id: '2', step: 2, description: 'Lascia lievitare l\'impasto per almeno 2 ore.', timer: 120 },
      { id: '3', step: 3, description: 'Stendi l\'impasto e aggiungi pomodoro, mozzarella e basilico.' },
      { id: '4', step: 4, description: 'Cuoci in forno a 250°C per 10-12 minuti.', timer: 12 }
    ],
    nutritionInfo: {
      calories: 800,
      protein: 35,
      carbs: 90,
      fat: 30,
      fiber: 4,
      sugar: 8,
      sodium: 1200
    },
    author: 'Pizzaiolo Giuseppe',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    isFavorite: false
  },
  {
    id: '3',
    name: 'Risotto ai Funghi Porcini',
    description: 'Cremoso risotto con funghi porcini freschi, parmigiano e un tocco di vino bianco.',
    image: getFoodImageByName('Risotto ai Funghi'),
    cookTime: '35 min',
    prepTime: '15 min',
    difficulty: 'Media',
    rating: 4.7,
    calories: 420,
    servings: 4,
    category: 'Primi Piatti',
    tags: ['Italiana', 'Risotto', 'Funghi', 'Autunnale'],
    ingredients: [
      { id: '1', name: 'Riso Carnaroli', quantity: 320, unit: 'g' },
      { id: '2', name: 'Funghi porcini', quantity: 300, unit: 'g' },
      { id: '3', name: 'Brodo vegetale', quantity: 1, unit: 'litro' },
      { id: '4', name: 'Cipolla', quantity: 1, unit: 'pz', notes: 'piccola' },
      { id: '5', name: 'Vino bianco', quantity: 100, unit: 'ml' },
      { id: '6', name: 'Parmigiano', quantity: 80, unit: 'g' },
      { id: '7', name: 'Burro', quantity: 50, unit: 'g' },
      { id: '8', name: 'Prezzemolo', quantity: 1, unit: 'mazzo' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Pulisci i funghi e tagliali a fette. Tieni il brodo caldo.' },
      { id: '2', step: 2, description: 'Soffriggi la cipolla tritata con olio e burro.', timer: 3 },
      { id: '3', step: 3, description: 'Aggiungi i funghi e cuoci per 5 minuti.', timer: 5 },
      { id: '4', step: 4, description: 'Tostat il riso per 2 minuti, poi sfuma con il vino.', timer: 2 },
      { id: '5', step: 5, description: 'Aggiungi il brodo mestolo per mestolo fino a cottura.', timer: 18 },
      { id: '6', step: 6, description: 'Manteca con parmigiano e prezzemolo.' }
    ],
    nutritionInfo: {
      calories: 420,
      protein: 12,
      carbs: 68,
      fat: 12,
      fiber: 2,
      sugar: 3,
      sodium: 680
    },
    author: 'Nonna Rosa',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    isFavorite: true
  },
  {
    id: '4',
    name: 'Insalata Caesar',
    description: 'Fresca insalata con lattuga romana, crostini, parmigiano e la famosa salsa Caesar.',
    image: getFoodImageByName('Insalata Caesar'),
    cookTime: '15 min',
    prepTime: '10 min',
    difficulty: 'Facile',
    rating: 4.5,
    calories: 320,
    servings: 2,
    category: 'Contorni',
    tags: ['Insalata', 'Veloce', 'Leggera', 'Americana'],
    ingredients: [
      { id: '1', name: 'Lattuga romana', quantity: 2, unit: 'cespi' },
      { id: '2', name: 'Pane', quantity: 4, unit: 'fette', notes: 'per crostini' },
      { id: '3', name: 'Parmigiano', quantity: 50, unit: 'g' },
      { id: '4', name: 'Aglio', quantity: 2, unit: 'spicchi' },
      { id: '5', name: 'Olio extravergine', quantity: 4, unit: 'cucchiai' },
      { id: '6', name: 'Succo di limone', quantity: 2, unit: 'cucchiai' },
      { id: '7', name: 'Worcestershire', quantity: 1, unit: 'cucchiaino' },
      { id: '8', name: 'Acciughe', quantity: 3, unit: 'filetti' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Prepara i crostini tostando il pane con aglio e olio.', timer: 8 },
      { id: '2', step: 2, description: 'Lava e taglia la lattuga a pezzi.' },
      { id: '3', step: 3, description: 'Prepara la salsa mescolando olio, limone, worcestershire e acciughe.' },
      { id: '4', step: 4, description: 'Condisci l\'insalata e aggiungi parmigiano e crostini.' }
    ],
    nutritionInfo: {
      calories: 320,
      protein: 14,
      carbs: 18,
      fat: 24,
      fiber: 4,
      sugar: 6,
      sodium: 620
    },
    author: 'Chef Anna',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    isFavorite: false
  },
  {
    id: '5',
    name: 'Tiramisù',
    description: 'Il dolce italiano più famoso al mondo con mascarpone, caffè e cacao.',
    image: getFoodImageByName('Tiramisù'),
    cookTime: '30 min',
    prepTime: '4 ore',
    difficulty: 'Media',
    rating: 4.9,
    calories: 580,
    servings: 6,
    category: 'Dolci',
    tags: ['Dolce', 'Italiana', 'Caffè', 'Senza Cottura'],
    ingredients: [
      { id: '1', name: 'Savoiardi', quantity: 300, unit: 'g' },
      { id: '2', name: 'Mascarpone', quantity: 500, unit: 'g' },
      { id: '3', name: 'Uova', quantity: 4, unit: 'pz', notes: 'separate' },
      { id: '4', name: 'Zucchero', quantity: 100, unit: 'g' },
      { id: '5', name: 'Caffè espresso', quantity: 300, unit: 'ml', notes: 'freddo' },
      { id: '6', name: 'Cacao amaro', quantity: 2, unit: 'cucchiai' },
      { id: '7', name: 'Liquore al caffè', quantity: 3, unit: 'cucchiai', notes: 'opzionale' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Prepara il caffè e lascialo raffreddare.' },
      { id: '2', step: 2, description: 'Monta i tuorli con lo zucchero fino a diventare spumosi.', timer: 5 },
      { id: '3', step: 3, description: 'Incorpora il mascarpone al composto di uova.' },
      { id: '4', step: 4, description: 'Monta gli albumi a neve e incorporali delicatamente.' },
      { id: '5', step: 5, description: 'Inzuppa i savoiardi nel caffè e alterna con la crema.' },
      { id: '6', step: 6, description: 'Riponi in frigo per almeno 4 ore e cospargi di cacao.', timer: 240 }
    ],
    nutritionInfo: {
      calories: 580,
      protein: 12,
      carbs: 45,
      fat: 38,
      fiber: 1,
      sugar: 35,
      sodium: 85
    },
    author: 'Pasticciere Luigi',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    isFavorite: true
  },
  {
    id: '6',
    name: 'Pancakes Americani',
    description: 'Soffici pancakes per una colazione perfetta, serviti con sciroppo d\'acero e frutti di bosco.',
    image: getFoodImageByName('Pancakes'),
    cookTime: '20 min',
    prepTime: '10 min',
    difficulty: 'Facile',
    rating: 4.6,
    calories: 450,
    servings: 4,
    category: 'Colazione',
    tags: ['Colazione', 'Americano', 'Dolce', 'Veloce'],
    ingredients: [
      { id: '1', name: 'Farina', quantity: 200, unit: 'g' },
      { id: '2', name: 'Latte', quantity: 250, unit: 'ml' },
      { id: '3', name: 'Uova', quantity: 2, unit: 'pz' },
      { id: '4', name: 'Zucchero', quantity: 30, unit: 'g' },
      { id: '5', name: 'Lievito in polvere', quantity: 8, unit: 'g' },
      { id: '6', name: 'Burro fuso', quantity: 40, unit: 'g' },
      { id: '7', name: 'Sale', quantity: 1, unit: 'pizzico' },
      { id: '8', name: 'Sciroppo d\'acero', quantity: 1, unit: 'per servire' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Mescola farina, zucchero, lievito e sale in una ciotola.' },
      { id: '2', step: 2, description: 'In un\'altra ciotola sbatti uova, latte e burro fuso.' },
      { id: '3', step: 3, description: 'Unisci gli ingredienti secchi a quelli liquidi senza lavorare troppo.' },
      { id: '4', step: 4, description: 'Cuoci i pancakes in padella antiaderente per 2-3 minuti per lato.', timer: 15 },
      { id: '5', step: 5, description: 'Servi caldi con sciroppo d\'acero e frutti di bosco.' }
    ],
    nutritionInfo: {
      calories: 450,
      protein: 12,
      carbs: 65,
      fat: 16,
      fiber: 2,
      sugar: 25,
      sodium: 380
    },
    author: 'Chef Sarah',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
    isFavorite: false
  }
];

// Funzioni di utilità per la gestione delle ricette
export const searchRecipes = (recipes: Recipe[], searchTerm: string): Recipe[] => {
  if (!searchTerm.trim()) return recipes;
  
  const term = searchTerm.toLowerCase();
  return recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(term) ||
    recipe.description.toLowerCase().includes(term) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(term)) ||
    recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(term)) ||
    recipe.category.toLowerCase().includes(term)
  );
};

export const filterRecipes = (recipes: Recipe[], filters: any): Recipe[] => {
  return recipes.filter(recipe => {
    // Filtro categoria
    if (filters.category && recipe.category !== filters.category) {
      return false;
    }
    
    // Filtro difficoltà
    if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
      return false;
    }
    
    // Filtro tempo di cottura
    if (filters.maxCookTime) {
      const cookTimeMinutes = parseInt(recipe.cookTime.replace(/\D/g, ''));
      if (cookTimeMinutes > filters.maxCookTime) {
        return false;
      }
    }
    
    // Filtro rating minimo
    if (filters.minRating && recipe.rating < filters.minRating) {
      return false;
    }
    
    return true;
  });
};

export const sortRecipes = (recipes: Recipe[], sortOption: any): Recipe[] => {
  return [...recipes].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortOption.field) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'cookTime':
        aValue = parseInt(a.cookTime.replace(/\D/g, ''));
        bValue = parseInt(b.cookTime.replace(/\D/g, ''));
        break;
      case 'calories':
        aValue = a.calories;
        bValue = b.calories;
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }
    
    if (sortOption.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};
