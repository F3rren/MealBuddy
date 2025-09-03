import React, { useState, useCallback } from 'react';
import type { RecipeSortOption } from '../../types/recipe';

interface RecipeSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortOption: RecipeSortOption;
  onSortChange: (sort: RecipeSortOption) => void;
  totalResults: number;
}

const SORT_OPTIONS: { label: string; value: RecipeSortOption }[] = [
  { label: 'Nome A-Z', value: { field: 'name', direction: 'asc' } },
  { label: 'Nome Z-A', value: { field: 'name', direction: 'desc' } },
  { label: 'Rating più alto', value: { field: 'rating', direction: 'desc' } },
  { label: 'Rating più basso', value: { field: 'rating', direction: 'asc' } },
  { label: 'Tempo più breve', value: { field: 'cookTime', direction: 'asc' } },
  { label: 'Tempo più lungo', value: { field: 'cookTime', direction: 'desc' } },
  { label: 'Più recenti', value: { field: 'createdAt', direction: 'desc' } },
  { label: 'Meno calorie', value: { field: 'calories', direction: 'asc' } }
];

const RecipeSearch: React.FC<RecipeSearchProps> = ({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  totalResults
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = SORT_OPTIONS.find(opt => 
      opt.value.field === e.target.value.split('-')[0] && 
      opt.value.direction === e.target.value.split('-')[1]
    );
    if (selectedOption) {
      onSortChange(selectedOption.value);
    }
  }, [onSortChange]);

  const getSortValue = (sort: RecipeSortOption) => `${sort.field}-${sort.direction}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Barra di ricerca */}
        <div className="flex-1 max-w-md">
          <div className={`relative transition-all duration-200 ${
            isSearchFocused ? 'transform scale-105' : ''
          }`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">🔍</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Cerca ricette per nome, ingredienti, tag..."
              className={`block w-full pl-10 pr-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 ${
                isSearchFocused 
                  ? 'border-green-500 shadow-lg ring-2 ring-green-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-lg">✕</span>
              </button>
            )}
          </div>
        </div>

        {/* Ordinamento */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Ordina per:
            </label>
            <select
              id="sort-select"
              value={getSortValue(sortOption)}
              onChange={handleSortChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={getSortValue(option.value)} value={getSortValue(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Contatore risultati */}
          <div className="text-sm text-gray-600 whitespace-nowrap">
            <span className="font-medium">{totalResults}</span> ricette
          </div>
        </div>
      </div>

      {/* Info ricerca attiva */}
      {searchTerm && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <span className="font-medium">Ricerca attiva:</span> "{searchTerm}"
            <button
              onClick={() => onSearchChange('')}
              className="ml-2 text-green-600 hover:text-green-700 underline"
            >
              Cancella ricerca
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
