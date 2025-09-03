import React from 'react';
import RecipeCard from '../RecipeCard';
import type { Recipe } from '../../types/recipe';

interface RecipeGridProps {
  recipes: Recipe[];
  loading?: boolean;
  onRecipeClick: (recipe: Recipe) => void;
  onToggleFavorite: (recipeId: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  loading = false,
  onRecipeClick,
  onToggleFavorite
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Nessuna ricetta trovata
        </h3>
        <p className="text-gray-600 mb-6">
          Prova a modificare i filtri di ricerca o aggiungi una nuova ricetta
        </p>
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
          Aggiungi la tua prima ricetta
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="relative group">
          <RecipeCard
            name={recipe.name}
            image={recipe.image}
            cookTime={recipe.cookTime}
            difficulty={recipe.difficulty}
            rating={recipe.rating}
            calories={recipe.calories}
            servings={recipe.servings}
            tags={recipe.tags}
            description={recipe.description}
            onClick={() => onRecipeClick(recipe)}
          />
          
          {/* Pulsante Preferiti */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 ${
              recipe.isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 shadow-md'
            }`}
            title={recipe.isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
          >
            <span className="text-lg">
              {recipe.isFavorite ? '❤️' : '🤍'}
            </span>
          </button>

          {/* Badge Categoria */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full backdrop-blur-sm">
              {recipe.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
