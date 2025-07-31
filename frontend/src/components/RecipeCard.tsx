import React from 'react';
import type { ReactNode } from 'react';
import FoodImage from './FoodImage';
import { getFoodImageByName } from '../hooks/useFoodImages';

interface RecipeCardProps {
  id?: string;
  name: string;
  image: string;
  cookTime: string;
  difficulty: 'Facile' | 'Media' | 'Difficile';
  rating?: number;
  calories?: number;
  servings?: number;
  tags?: string[];
  description?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  image,
  cookTime,
  difficulty,
  rating = 0,
  calories,
  servings,
  tags = [],
  description,
  onClick,
  className = "",
  children
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Facile': return 'bg-green-100 text-green-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Usa immagine fornita o genera automaticamente basata sul nome
  const imageUrl = image || getFoodImageByName(name);

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group ${className}`}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-xl">
        <FoodImage
          src={imageUrl}
          alt={name}
          className="w-full h-48"
          fallbackText={name}
        />
        
        {/* Overlay with rating */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        
        {rating > 0 && (
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-sm font-medium shadow-lg flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span>
            {rating}
          </div>
        )}

        {/* Difficulty Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
          {name}
        </h3>
        
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <span className="mr-1">⏱️</span>
              {cookTime}
            </span>
            {servings && (
              <span className="flex items-center">
                <span className="mr-1">👥</span>
                {servings}
              </span>
            )}
            {calories && (
              <span className="flex items-center">
                <span className="mr-1">🔥</span>
                {calories} cal
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Custom children content */}
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-300 rounded-xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

export default RecipeCard;
