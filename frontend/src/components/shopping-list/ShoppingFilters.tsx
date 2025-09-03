import React from 'react';
import type { ShoppingCategory, ShoppingStatus, ShoppingPriority } from '../../types/shopping-list';

interface ShoppingFiltersProps {
  selectedCategories: ShoppingCategory[];
  selectedStatuses: ShoppingStatus[];
  selectedPriorities: ShoppingPriority[];
  sortBy: 'name' | 'category' | 'priority' | 'price';
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  onCategoryToggle: (category: ShoppingCategory) => void;
  onStatusToggle: (status: ShoppingStatus) => void;
  onPriorityToggle: (priority: ShoppingPriority) => void;
  onSortChange: (sortBy: 'name' | 'category' | 'priority' | 'price') => void;
  onSortOrderToggle: () => void;
  onSearchChange: (term: string) => void;
  onClearFilters: () => void;
}

const CATEGORIES: ShoppingCategory[] = [
  'Frutta e Verdura',
  'Carne e Pesce',
  'Latticini e Uova',
  'Cereali e Pasta',
  'Pane e Dolci',
  'Condimenti e Spezie',
  'Bevande',
  'Surgelati',
  'Conserve',
  'Altro'
];

const STATUSES: { value: ShoppingStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Da comprare', color: 'bg-orange-100 text-orange-800' },
  { value: 'in-cart', label: 'Nel carrello', color: 'bg-blue-100 text-blue-800' },
  { value: 'purchased', label: 'Acquistato', color: 'bg-green-100 text-green-800' },
  { value: 'unavailable', label: 'Non disponibile', color: 'bg-gray-100 text-gray-800' }
];

const PRIORITIES: { value: ShoppingPriority; label: string; color: string }[] = [
  { value: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-800' },
  { value: 'alta', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
  { value: 'media', label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'bassa', label: 'Bassa', color: 'bg-green-100 text-green-800' }
];

const SORT_OPTIONS = [
  { value: 'name', label: 'Nome' },
  { value: 'category', label: 'Categoria' },
  { value: 'priority', label: 'Priorità' },
  { value: 'price', label: 'Prezzo' }
] as const;

const ShoppingFilters: React.FC<ShoppingFiltersProps> = ({
  selectedCategories,
  selectedStatuses,
  selectedPriorities,
  sortBy,
  sortOrder,
  searchTerm,
  onCategoryToggle,
  onStatusToggle,
  onPriorityToggle,
  onSortChange,
  onSortOrderToggle,
  onSearchChange,
  onClearFilters
}) => {
  const hasActiveFilters = selectedCategories.length > 0 || 
                          selectedStatuses.length > 0 || 
                          selectedPriorities.length > 0 ||
                          searchTerm.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Barra di ricerca e azioni principali */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cerca prodotti..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {/* Ordinamento */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                Ordina per {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={onSortOrderToggle}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Cancella filtri
            </button>
          )}
        </div>
      </div>

      {/* Filtri */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categorie */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Categorie</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {CATEGORIES.map(category => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryToggle(category)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Status</h4>
          <div className="space-y-2">
            {STATUSES.map(status => (
              <label key={status.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status.value)}
                  onChange={() => onStatusToggle(status.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                  {status.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Priorità */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Priorità</h4>
          <div className="space-y-2">
            {PRIORITIES.map(priority => (
              <label key={priority.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPriorities.includes(priority.value)}
                  onChange={() => onPriorityToggle(priority.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={`text-xs px-2 py-1 rounded-full ${priority.color}`}>
                  {priority.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Contatori filtri attivi */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            {selectedCategories.length > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {selectedCategories.length} categorie
              </span>
            )}
            {selectedStatuses.length > 0 && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                {selectedStatuses.length} status
              </span>
            )}
            {selectedPriorities.length > 0 && (
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                {selectedPriorities.length} priorità
              </span>
            )}
            {searchTerm && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Ricerca: "{searchTerm}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingFilters;
