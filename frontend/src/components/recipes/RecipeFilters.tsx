import React from 'react';
import type { RecipeFilters, RecipeCategory, Difficulty } from '../../types/recipe';

interface RecipeFiltersProps {
  filters: RecipeFilters;
  onFiltersChange: (filters: RecipeFilters) => void;
  onClearFilters: () => void;
}

const CATEGORIES: RecipeCategory[] = [
  'Antipasti',
  'Primi Piatti',
  'Secondi Piatti',
  'Contorni',
  'Dolci',
  'Bevande',
  'Colazione',
  'Snack'
];

const DIFFICULTIES: Difficulty[] = ['Facile', 'Media', 'Difficile'];

const COOK_TIME_OPTIONS = [
  { label: 'Fino a 15 min', value: 15 },
  { label: 'Fino a 30 min', value: 30 },
  { label: 'Fino a 45 min', value: 45 },
  { label: 'Fino a 1 ora', value: 60 },
  { label: 'Oltre 1 ora', value: 999 }
];

const RecipeFiltersComponent: React.FC<RecipeFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const handleFilterChange = (key: keyof RecipeFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === filters[key] ? undefined : value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="text-xl mr-2">🔍</span>
          Filtri
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Cancella filtri
          </button>
        )}
      </div>

      {/* Categoria */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Categoria
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange('category', category)}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                filters.category === category
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Difficoltà */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Difficoltà
        </label>
        <div className="flex gap-2">
          {DIFFICULTIES.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => handleFilterChange('difficulty', difficulty)}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                filters.difficulty === difficulty
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Tempo di Cottura */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tempo di Cottura
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {COOK_TIME_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange('maxCookTime', option.value)}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                filters.maxCookTime === option.value
                  ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Minimo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Rating Minimo
        </label>
        <div className="flex gap-2">
          {[3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleFilterChange('minRating', rating)}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center ${
                filters.minRating === rating
                  ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="mr-1">⭐</span>
              {rating}+
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeFiltersComponent;
