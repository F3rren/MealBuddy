import React, { useState } from 'react';
import ShoppingItemCard from './ShoppingItemCard';
import type { ShoppingItem, ShoppingCategory, ShoppingStatus } from '../../types/shopping-list';

interface CategorySectionProps {
  category: ShoppingCategory;
  items: ShoppingItem[];
  onToggleStatus: (itemId: string, newStatus: ShoppingStatus) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onUpdatePrice: (itemId: string, price: number) => void;
  onAddNote: (itemId: string, note: string) => void;
  onRemove: (itemId: string) => void;
  isCollapsed?: boolean;
}

const CATEGORY_ICONS: Record<ShoppingCategory, string> = {
  'Frutta e Verdura': '🥬',
  'Carne e Pesce': '🥩',
  'Latticini e Uova': '🥛',
  'Cereali e Pasta': '🍝',
  'Pane e Dolci': '🍞',
  'Condimenti e Spezie': '🧂',
  'Bevande': '🥤',
  'Surgelati': '🧊',
  'Conserve': '🥫',
  'Altro': '📦'
};

const CATEGORY_COLORS: Record<ShoppingCategory, string> = {
  'Frutta e Verdura': 'bg-green-50 border-green-200',
  'Carne e Pesce': 'bg-red-50 border-red-200',
  'Latticini e Uova': 'bg-blue-50 border-blue-200',
  'Cereali e Pasta': 'bg-yellow-50 border-yellow-200',
  'Pane e Dolci': 'bg-orange-50 border-orange-200',
  'Condimenti e Spezie': 'bg-purple-50 border-purple-200',
  'Bevande': 'bg-cyan-50 border-cyan-200',
  'Surgelati': 'bg-indigo-50 border-indigo-200',
  'Conserve': 'bg-gray-50 border-gray-200',
  'Altro': 'bg-gray-50 border-gray-200'
};

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
  onToggleStatus,
  onUpdateQuantity,
  onUpdatePrice,
  onAddNote,
  onRemove,
  isCollapsed = false
}) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  if (items.length === 0) {
    return null;
  }

  const completedItems = items.filter(item => item.status === 'purchased').length;
  const totalEstimatedCost = items.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
  const totalActualCost = items.reduce((sum, item) => sum + (item.actualPrice || 0), 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className={`rounded-xl border-2 overflow-hidden ${CATEGORY_COLORS[category]}`}>
      {/* Header categoria */}
      <div 
        className="p-4 cursor-pointer hover:bg-white/50 transition-colors"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{CATEGORY_ICONS[category]}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {category}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  {completedItems}/{items.length} completati
                </span>
                {totalEstimatedCost > 0 && (
                  <span>
                    Budget: {formatPrice(totalEstimatedCost)}
                  </span>
                )}
                {totalActualCost > 0 && (
                  <span className="text-green-600">
                    Speso: {formatPrice(totalActualCost)}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Barra di progresso */}
            <div className="w-20 bg-white/60 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${items.length > 0 ? (completedItems / items.length) * 100 : 0}%` }}
              />
            </div>
            
            {/* Icona collapse */}
            <span className={`text-gray-500 transition-transform duration-200 ${
              collapsed ? 'rotate-0' : 'rotate-180'
            }`}>
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Lista items */}
      {!collapsed && (
        <div className="p-4 pt-0 space-y-3">
          {items
            .sort((a, b) => {
              // Ordina per status (pending first) poi per priorità
              if (a.status !== b.status) {
                const statusOrder = ['pending', 'in-cart', 'purchased', 'unavailable'];
                return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
              }
              
              const priorityOrder = ['urgente', 'alta', 'media', 'bassa'];
              return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
            })
            .map((item) => (
              <ShoppingItemCard
                key={item.id}
                item={item}
                onToggleStatus={onToggleStatus}
                onUpdateQuantity={onUpdateQuantity}
                onUpdatePrice={onUpdatePrice}
                onAddNote={onAddNote}
                onRemove={onRemove}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
