import React from 'react';
import type { ShoppingItem, ShoppingCategory } from '../../types/shopping-list';

interface ShoppingStatsProps {
  items: ShoppingItem[];
}

const ShoppingStats: React.FC<ShoppingStatsProps> = ({ items }) => {
  // Statistiche generali
  const totalItems = items.length;
  const completedItems = items.filter(item => item.status === 'purchased').length;
  const pendingItems = items.filter(item => item.status === 'pending').length;
  const inCartItems = items.filter(item => item.status === 'in-cart').length;
  const unavailableItems = items.filter(item => item.status === 'unavailable').length;

  // Statistiche economiche
  const totalEstimatedCost = items.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
  const totalActualCost = items.reduce((sum, item) => sum + (item.actualPrice || 0), 0);
  const savedAmount = totalEstimatedCost - totalActualCost;
  const savingsPercentage = totalEstimatedCost > 0 ? (savedAmount / totalEstimatedCost) * 100 : 0;

  // Statistiche per categoria
  const categoryStats = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { total: 0, completed: 0, cost: 0 };
    }
    acc[item.category].total++;
    if (item.status === 'purchased') {
      acc[item.category].completed++;
      acc[item.category].cost += item.actualPrice || 0;
    }
    return acc;
  }, {} as Record<ShoppingCategory, { total: number; completed: number; cost: number }>);

  // Statistiche per priorità
  const priorityStats = items.reduce((acc, item) => {
    if (!acc[item.priority]) {
      acc[item.priority] = { total: 0, completed: 0 };
    }
    acc[item.priority].total++;
    if (item.status === 'purchased') {
      acc[item.priority].completed++;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Statistiche principali */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Riepilogo Spesa</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
            <div className="text-sm text-gray-600">Totale prodotti</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedItems}</div>
            <div className="text-sm text-gray-600">Acquistati</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingItems}</div>
            <div className="text-sm text-gray-600">Da comprare</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{inCartItems}</div>
            <div className="text-sm text-gray-600">Nel carrello</div>
          </div>
        </div>

        {/* Barra di progresso */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso acquisti</span>
            <span>{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {unavailableItems > 0 && (
          <div className="text-center text-sm text-gray-500">
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
              {unavailableItems} prodotti non disponibili
            </span>
          </div>
        )}
      </div>

      {/* Statistiche economiche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget e Spese</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {formatPrice(totalEstimatedCost)}
            </div>
            <div className="text-sm text-gray-600">Budget stimato</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {formatPrice(totalActualCost)}
            </div>
            <div className="text-sm text-gray-600">Spesa effettiva</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className={`text-lg font-bold ${savedAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {savedAmount >= 0 ? '+' : ''}{formatPrice(savedAmount)}
            </div>
            <div className="text-sm text-gray-600">
              {savedAmount >= 0 ? 'Risparmiato' : 'Speso in più'}
            </div>
          </div>
        </div>

        {totalEstimatedCost > 0 && (
          <div className="text-center text-sm text-gray-600">
            <span className={`font-medium ${savingsPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {savingsPercentage >= 0 ? '+' : ''}{Math.round(savingsPercentage)}% rispetto al budget
            </span>
          </div>
        )}
      </div>

      {/* Statistiche per categoria */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Per Categoria</h3>
        
        <div className="space-y-3">
          {Object.entries(categoryStats)
            .sort(([,a], [,b]) => b.total - a.total)
            .map(([category, stats]) => {
              const percentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
              return (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-700">{category}</span>
                      <span className="text-sm text-gray-600">
                        {stats.completed}/{stats.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  {stats.cost > 0 && (
                    <div className="ml-4 text-sm font-medium text-green-600">
                      {formatPrice(stats.cost)}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Statistiche per priorità */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Per Priorità</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(priorityStats).map(([priority, stats]) => {
            const percentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
            const priorityColors = {
              urgente: 'bg-red-50 border-red-200 text-red-800',
              alta: 'bg-orange-50 border-orange-200 text-orange-800',
              media: 'bg-yellow-50 border-yellow-200 text-yellow-800',
              bassa: 'bg-green-50 border-green-200 text-green-800'
            };
            
            return (
              <div key={priority} className={`p-4 rounded-lg border-2 ${priorityColors[priority as keyof typeof priorityColors] || 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                <div className="text-center">
                  <div className="text-lg font-bold">
                    {stats.completed}/{stats.total}
                  </div>
                  <div className="text-sm font-medium capitalize mb-2">
                    {priority}
                  </div>
                  <div className="w-full bg-white/60 rounded-full h-2">
                    <div 
                      className="bg-current h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShoppingStats;
