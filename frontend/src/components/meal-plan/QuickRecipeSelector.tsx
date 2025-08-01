import React, { useState, useMemo } from 'react';
import type { Recipe } from '../../types/recipe';
import type { MealType } from '../../types/meal-plan';

interface QuickRecipeSelectorProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe, servings: number) => void;
  onClose: () => void;
  targetMealType?: MealType;
  targetDate?: string;
}

const MEAL_TYPE_SUGGESTIONS: Record<MealType, string[]> = {
  colazione: ['Colazione', 'Dolci', 'Snack'],
  pranzo: ['Primi Piatti', 'Secondi Piatti', 'Contorni'],
  cena: ['Primi Piatti', 'Secondi Piatti', 'Contorni'],
  spuntino: ['Snack', 'Dolci', 'Antipasti']
};

const QuickRecipeSelector: React.FC<QuickRecipeSelectorProps> = ({
  recipes,
  onSelectRecipe,
  onClose,
  targetMealType,
  targetDate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [servings, setServings] = useState(2);

  // Filtra ricette in base al tipo di pasto suggerito
  const suggestedRecipes = useMemo(() => {
    let filtered = recipes;

    // Filtra per categorie suggerite per il tipo di pasto
    if (targetMealType && MEAL_TYPE_SUGGESTIONS[targetMealType]) {
      const suggestedCategories = MEAL_TYPE_SUGGESTIONS[targetMealType];
      filtered = filtered.filter(recipe => 
        suggestedCategories.includes(recipe.category)
      );
    }

    // Filtra per categoria selezionata
    if (selectedCategory) {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    // Filtra per termine di ricerca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(term) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [recipes, targetMealType, selectedCategory, searchTerm]);

  const categories = useMemo(() => {
    const cats = new Set(recipes.map(recipe => recipe.category));
    return Array.from(cats).sort();
  }, [recipes]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Aggiungi Ricetta
              </h2>
              {targetDate && targetMealType && (
                <p className="text-green-100">
                  {formatDate(targetDate)} • {targetMealType.charAt(0).toUpperCase() + targetMealType.slice(1)}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* Controlli */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          {/* Ricerca */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca ricette..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filtro categoria */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Tutte le categorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Porzioni */}
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Porzioni
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Lista ricette */}
        <div className="max-h-96 overflow-y-auto p-6">
          {suggestedRecipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nessuna ricetta trovata
              </h3>
              <p className="text-gray-600">
                Prova a modificare i filtri di ricerca
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe, servings)}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-green-300 transition-all duration-200 cursor-pointer"
                >
                  {/* Immagine */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-gray-200 items-center justify-center text-4xl">
                      🍽️
                    </div>
                    
                    {/* Badge categoria */}
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                        {recipe.category}
                      </span>
                    </div>
                  </div>

                  {/* Contenuto */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                      {recipe.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {recipe.description}
                    </p>
                    
                    {/* Metadati */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>⏱️ {recipe.cookTime}</span>
                        <span>⭐ {recipe.rating}</span>
                      </div>
                      <span>{recipe.calories} cal</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {suggestedRecipes.length} ricette disponibili
            </span>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickRecipeSelector;
