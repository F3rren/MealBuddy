import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ShoppingFilters from '../../components/shopping-list/ShoppingFilters';
import CategorySection from '../../components/shopping-list/CategorySection';
import ShoppingStats from '../../components/shopping-list/ShoppingStats';
import { mockShoppingItems } from '../../data/shopping-list';

import type { 
  ShoppingItem, 
  ShoppingCategory, 
  ShoppingStatus, 
  ShoppingPriority 
} from '../../types/shopping-list';

const ShoppingList: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ShoppingItem[]>(mockShoppingItems);
  
  // Filtri
  const [selectedCategories, setSelectedCategories] = useState<ShoppingCategory[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ShoppingStatus[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<ShoppingPriority[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'priority' | 'price'>('category');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // View mode
  const [viewMode, setViewMode] = useState<'categories' | 'list' | 'stats'>('categories');

  // Filtri applicati
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filtro per ricerca
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro per categorie
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => selectedCategories.includes(item.category));
    }

    // Filtro per status
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(item => selectedStatuses.includes(item.status));
    }

    // Filtro per priorità
    if (selectedPriorities.length > 0) {
      filtered = filtered.filter(item => selectedPriorities.includes(item.priority));
    }

    // Ordinamento
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name, 'it');
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category, 'it');
          break;
        case 'priority':
          const priorityOrder = ['urgente', 'alta', 'media', 'bassa'];
          comparison = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
          break;
        case 'price':
          const priceA = a.estimatedPrice || 0;
          const priceB = b.estimatedPrice || 0;
          comparison = priceA - priceB;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [items, searchTerm, selectedCategories, selectedStatuses, selectedPriorities, sortBy, sortOrder]);

  // Raggruppa per categoria
  const itemsByCategory = useMemo(() => {
    const grouped = filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<ShoppingCategory, ShoppingItem[]>);

    return grouped;
  }, [filteredItems]);

  // Handlers
  const handleToggleStatus = (itemId: string, newStatus: ShoppingStatus) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: newStatus } : item
    ));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleUpdatePrice = (itemId: string, price: number) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, actualPrice: price } : item
    ));
  };

  const handleAddNote = (itemId: string, note: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, notes: note } : item
    ));
  };

  const handleRemove = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCategoryToggle = (category: ShoppingCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleStatusToggle = (status: ShoppingStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handlePriorityToggle = (priority: ShoppingPriority) => {
    setSelectedPriorities(prev =>
      prev.includes(priority)
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSelectedPriorities([]);
    setSearchTerm('');
  };

  const handleSortOrderToggle = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Lista della Spesa
              </h1>
              <p className="text-gray-600 mt-2">
                Ciao {user?.username}! Gestisci la tua lista della spesa in modo intelligente
              </p>
            </div>

            {/* Toggle view mode */}
            <div className="flex bg-white rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setViewMode('categories')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'categories'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📂 Categorie
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 Lista
              </button>
              <button
                onClick={() => setViewMode('stats')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'stats'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📊 Statistiche
              </button>
            </div>
          </div>
        </div>

        {/* Filtri (solo per categories e list) */}
        {viewMode !== 'stats' && (
          <ShoppingFilters
            selectedCategories={selectedCategories}
            selectedStatuses={selectedStatuses}
            selectedPriorities={selectedPriorities}
            sortBy={sortBy}
            sortOrder={sortOrder}
            searchTerm={searchTerm}
            onCategoryToggle={handleCategoryToggle}
            onStatusToggle={handleStatusToggle}
            onPriorityToggle={handlePriorityToggle}
            onSortChange={setSortBy}
            onSortOrderToggle={handleSortOrderToggle}
            onSearchChange={setSearchTerm}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Content basato su viewMode */}
        {viewMode === 'stats' ? (
          <ShoppingStats items={items} />
        ) : viewMode === 'categories' ? (
          <div className="space-y-6">
            {Object.entries(itemsByCategory)
              .sort(([a], [b]) => a.localeCompare(b, 'it'))
              .map(([category, categoryItems]) => (
                <CategorySection
                  key={category}
                  category={category as ShoppingCategory}
                  items={categoryItems}
                  onToggleStatus={handleToggleStatus}
                  onUpdateQuantity={handleUpdateQuantity}
                  onUpdatePrice={handleUpdatePrice}
                  onAddNote={handleAddNote}
                  onRemove={handleRemove}
                />
              ))}
            
            {Object.keys(itemsByCategory).length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nessun prodotto trovato
                </h3>
                <p className="text-gray-600">
                  Modifica i filtri per vedere più prodotti
                </p>
              </div>
            )}
          </div>
        ) : (
          // Vista lista
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tutti i prodotti ({filteredItems.length})
              </h3>
              
              <div className="space-y-3">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={item.status === 'purchased'}
                          onChange={() => handleToggleStatus(
                            item.id, 
                            item.status === 'purchased' ? 'pending' : 'purchased'
                          )}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            {item.category} • {item.quantity} {item.unit}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === 'urgente' ? 'bg-red-100 text-red-800' :
                          item.priority === 'alta' ? 'bg-orange-100 text-orange-800' :
                          item.priority === 'media' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        
                        {item.estimatedPrice && (
                          <span className="text-sm text-gray-600">
                            €{item.estimatedPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredItems.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-gray-600">Nessun prodotto trovato</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
