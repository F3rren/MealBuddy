import React, { useState, useMemo, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import AdvancedSearch, { type SearchFilters } from '../../components/search/AdvancedSearch';
import RecipeFilters from '../../components/recipes/RecipeFilters';
import RecipeGrid from '../../components/recipes/RecipeGrid';
import type { Recipe, RecipeFilters as RecipeFiltersType, RecipeSortOption, RecipeCategory, Difficulty } from '../../types/recipe';
import { MOCK_RECIPES, searchRecipes, filterRecipes, sortRecipes } from '../../data/recipes';

const RecipesPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  
  // Stati per ricerca, filtri e ordinamento
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<RecipeFiltersType>({});
  const [sortOption] = useState<RecipeSortOption>({
    field: 'name',
    direction: 'asc'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock suggestions per la ricerca
  const searchSuggestions = [
    'Pasta al pomodoro', 'Risotto ai funghi', 'Pizza margherita',
    'Carbonara', 'Lasagne', 'Tiramisù', 'Parmigiana', 'Minestrone',
    'Focaccia', 'Gnocchi', 'Saltimbocca', 'Brasato'
  ];

  // Simulazione stato favoriti (in un'app reale questo verrebbe dal backend)
  const [favoriteRecipes, setFavoriteRecipes] = useState<Set<string>>(
    new Set(['1', '3', '5']) // Ricette preferite di default
  );

  // Elaborazione ricette con useMemo per performance
  const processedRecipes = useMemo(() => {
    let recipes = [...MOCK_RECIPES];
    
    // Aggiungi stato favoriti
    recipes = recipes.map(recipe => ({
      ...recipe,
      isFavorite: favoriteRecipes.has(recipe.id)
    }));
    
    // Applica ricerca
    if (searchTerm) {
      recipes = searchRecipes(recipes, searchTerm);
    }
    
    // Applica filtri
    recipes = filterRecipes(recipes, filters);
    
    // Applica ordinamento
    recipes = sortRecipes(recipes, sortOption);
    
    return recipes;
  }, [searchTerm, filters, sortOption, favoriteRecipes]);

  // Handlers
  const handleAdvancedSearch = useCallback((query: string, searchFilters: SearchFilters) => {
    setSearchTerm(query);
    
    // Converti i filtri avanzati in filtri normali per compatibilità
    const convertedFilters: RecipeFiltersType = {
      category: searchFilters.category as RecipeCategory || undefined,
      maxCookTime: searchFilters.maxCookingTime,
      difficulty: searchFilters.difficulty !== 'all' ? (
        searchFilters.difficulty === 'easy' ? 'Facile' :
        searchFilters.difficulty === 'medium' ? 'Media' : 'Difficile'
      ) as Difficulty : undefined,
      searchTerm: query
    };
    
    setFilters(convertedFilters);
    
    addToast({
      type: 'info',
      title: 'Ricerca effettuata',
      message: `Trovate ${processedRecipes.length} ricette con i filtri selezionati`
    });
  }, [addToast, processedRecipes.length]);

  const handleVoiceSearch = useCallback(() => {
    addToast({
      type: 'info',
      title: 'Ricerca vocale',
      message: 'Parla ora per cercare le ricette...'
    });
  }, [addToast]);

  const handleFiltersChange = useCallback((newFilters: RecipeFiltersType) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
  }, []);

  const handleRecipeClick = useCallback((recipe: Recipe) => {
    // TODO: Aprire modal o navigare alla pagina dettagli ricetta
    console.log('Clicked recipe:', recipe.name);
  }, []);

  const handleToggleFavorite = useCallback((recipeId: string) => {
    setFavoriteRecipes(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  }, []);

  // Verifica se ci sono filtri attivi
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0)
  ) || searchTerm !== '';

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
          Effettua l'accesso per visualizzare e gestire le tue ricette
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              🍲 Le Tue Ricette
            </h1>
            <p className="text-lg opacity-90">
              Esplora, organizza e crea le tue ricette preferite
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30">
              ➕ Nuova Ricetta
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white/30 ${
                showFilters || hasActiveFilters
                  ? 'bg-white text-green-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              🔍 Filtri
              {hasActiveFilters && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Barra di ricerca avanzata */}
      <div className="mb-6">
        <AdvancedSearch
          onSearch={handleAdvancedSearch}
          onVoiceSearch={handleVoiceSearch}
          suggestions={searchSuggestions}
        />
      </div>

      {/* Toggle filtri mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-full p-4 rounded-lg font-medium transition-all duration-200 ${
            showFilters || hasActiveFilters
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : 'bg-gray-50 text-gray-700 border border-gray-200'
          }`}
        >
          🔍 {showFilters ? 'Nascondi Filtri' : 'Mostra Filtri'}
          {hasActiveFilters && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Filtri attivi
            </span>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Filtri */}
        {(showFilters || window.innerWidth >= 1024) && (
          <div className="lg:col-span-1">
            <RecipeFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}

        {/* Griglia Ricette */}
        <div className={showFilters || window.innerWidth >= 1024 ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <RecipeGrid
            recipes={processedRecipes}
            loading={false}
            onRecipeClick={handleRecipeClick}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>

      {/* Statistiche in fondo */}
      {processedRecipes.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800">{processedRecipes.length}</div>
              <div className="text-sm text-gray-600">Ricette Trovate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{favoriteRecipes.size}</div>
              <div className="text-sm text-gray-600">Preferite</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(processedRecipes.reduce((acc, recipe) => acc + recipe.rating, 0) / processedRecipes.length * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">Rating Medio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(processedRecipes.reduce((acc, recipe) => acc + recipe.calories, 0) / processedRecipes.length)}
              </div>
              <div className="text-sm text-gray-600">Calorie Medie</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
