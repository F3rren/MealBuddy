import React, { useState } from 'react';
import type { ShoppingItem, ShoppingCategory, ShoppingPriority, ShoppingStatus } from '../../types/shopping-list';

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onToggleStatus: (itemId: string, newStatus: ShoppingStatus) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onUpdatePrice: (itemId: string, price: number) => void;
  onAddNote: (itemId: string, note: string) => void;
  onRemove: (itemId: string) => void;
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

const PRIORITY_COLORS: Record<ShoppingPriority, string> = {
  'bassa': 'text-gray-500',
  'media': 'text-blue-500',
  'alta': 'text-orange-500',
  'urgente': 'text-red-500'
};

const STATUS_COLORS: Record<ShoppingStatus, string> = {
  'pending': 'bg-gray-100 text-gray-700',
  'in-cart': 'bg-blue-100 text-blue-700',
  'purchased': 'bg-green-100 text-green-700',
  'unavailable': 'bg-red-100 text-red-700'
};

const ShoppingItemCard: React.FC<ShoppingItemCardProps> = ({
  item,
  onToggleStatus,
  onUpdateQuantity,
  onUpdatePrice,
  onAddNote,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingQuantity, setEditingQuantity] = useState(false);
  const [editingPrice, setEditingPrice] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(item.quantity);
  const [tempPrice, setTempPrice] = useState(item.actualPrice || item.estimatedPrice || 0);
  const [tempNote, setTempNote] = useState(item.notes || '');

  const handleStatusClick = () => {
    const statusFlow: ShoppingStatus[] = ['pending', 'in-cart', 'purchased'];
    const currentIndex = statusFlow.indexOf(item.status);
    const nextStatus = statusFlow[(currentIndex + 1) % statusFlow.length];
    onToggleStatus(item.id, nextStatus);
  };

  const handleQuantitySubmit = () => {
    onUpdateQuantity(item.id, tempQuantity);
    setEditingQuantity(false);
  };

  const handlePriceSubmit = () => {
    onUpdatePrice(item.id, tempPrice);
    setEditingPrice(false);
  };

  const handleNoteSubmit = () => {
    onAddNote(item.id, tempNote);
    setEditingNote(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border transition-all duration-200 ${
      item.status === 'purchased' ? 'opacity-70 bg-gray-50' : 'hover:shadow-lg'
    } ${item.priority === 'urgente' ? 'border-red-300' : 'border-gray-200'}`}>
      <div className="p-4">
        {/* Header principale */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            {/* Checkbox status */}
            <button
              onClick={handleStatusClick}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                item.status === 'purchased' 
                  ? 'bg-green-500 text-white' 
                  : item.status === 'in-cart'
                  ? 'bg-blue-500 text-white'
                  : 'border-2 border-gray-300 hover:border-green-400'
              }`}
            >
              {item.status === 'purchased' ? '✓' : item.status === 'in-cart' ? '🛒' : ''}
            </button>

            {/* Info principale */}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{CATEGORY_ICONS[item.category]}</span>
                <h3 className={`font-medium text-gray-800 ${
                  item.status === 'purchased' ? 'line-through' : ''
                }`}>
                  {item.name}
                </h3>
                <span className={`text-sm ${PRIORITY_COLORS[item.priority]}`}>
                  {item.priority === 'urgente' ? '🔥' : 
                   item.priority === 'alta' ? '⚠️' : 
                   item.priority === 'media' ? '📍' : ''}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                {/* Quantità */}
                <div className="flex items-center space-x-1">
                  {editingQuantity ? (
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        value={tempQuantity}
                        onChange={(e) => setTempQuantity(Number(e.target.value))}
                        className="w-16 px-1 py-0.5 border rounded text-center"
                        onBlur={handleQuantitySubmit}
                        onKeyDown={(e) => e.key === 'Enter' && handleQuantitySubmit()}
                        autoFocus
                      />
                      <span>{item.unit}</span>
                    </div>
                  ) : (
                    <span 
                      onClick={() => setEditingQuantity(true)}
                      className="cursor-pointer hover:bg-gray-100 px-1 rounded"
                    >
                      {item.quantity} {item.unit}
                    </span>
                  )}
                </div>

                {/* Prezzo */}
                {(item.estimatedPrice || item.actualPrice || editingPrice) && (
                  <div className="flex items-center space-x-1">
                    {editingPrice ? (
                      <input
                        type="number"
                        step="0.01"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-20 px-1 py-0.5 border rounded text-center"
                        onBlur={handlePriceSubmit}
                        onKeyDown={(e) => e.key === 'Enter' && handlePriceSubmit()}
                        autoFocus
                      />
                    ) : (
                      <span 
                        onClick={() => setEditingPrice(true)}
                        className="cursor-pointer hover:bg-gray-100 px-1 rounded text-green-600"
                      >
                        {formatPrice(item.actualPrice || item.estimatedPrice || 0)}
                      </span>
                    )}
                  </div>
                )}

                {/* Status badge */}
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[item.status]}`}>
                  {item.status === 'pending' ? 'Da comprare' :
                   item.status === 'in-cart' ? 'Nel carrello' :
                   item.status === 'purchased' ? 'Acquistato' : 'Non disponibile'}
                </span>
              </div>
            </div>
          </div>

          {/* Azioni */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isExpanded ? '↑' : '↓'}
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Dettagli espansi */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            {/* Categoria e priorità */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                📂 {item.category}
              </span>
              <span className={`text-sm ${PRIORITY_COLORS[item.priority]}`}>
                Priorità: {item.priority}
              </span>
            </div>

            {/* Ricette collegate */}
            {item.isFromRecipe && item.recipeNames.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-600">🍽️ Per ricette: </span>
                <span className="text-blue-600">
                  {item.recipeNames.join(', ')}
                </span>
              </div>
            )}

            {/* Note */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">📝 Note:</label>
              {editingNote ? (
                <textarea
                  value={tempNote}
                  onChange={(e) => setTempNote(e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  rows={2}
                  onBlur={handleNoteSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleNoteSubmit()}
                  autoFocus
                  placeholder="Aggiungi una nota..."
                />
              ) : (
                <div 
                  onClick={() => setEditingNote(true)}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded text-sm text-gray-700 min-h-[20px]"
                >
                  {item.notes || 'Clicca per aggiungere una nota...'}
                </div>
              )}
            </div>

            {/* Alternative */}
            {item.alternatives && item.alternatives.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-600">🔄 Alternative: </span>
                <span className="text-gray-700">
                  {item.alternatives.join(', ')}
                </span>
              </div>
            )}

            {/* Info aggiuntive */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                📅 Aggiunto: {new Date(item.addedDate).toLocaleDateString('it-IT')}
              </span>
              {item.purchasedDate && (
                <span>
                  ✅ Acquistato: {new Date(item.purchasedDate).toLocaleDateString('it-IT')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingItemCard;
