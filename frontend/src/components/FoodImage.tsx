import React, { useState } from 'react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: string;
  fallbackText?: string;
  lazy?: boolean;
}

const FoodImage: React.FC<FoodImageProps> = ({
  src,
  alt,
  className = "",
  fallbackIcon = "🍽️",
  fallbackText,
  lazy = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div className={`bg-gray-100 flex flex-col items-center justify-center ${className}`}>
        <span className="text-4xl mb-2">{fallbackIcon}</span>
        {fallbackText && (
          <span className="text-xs text-gray-500 text-center px-2">
            {fallbackText}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-2xl">{fallbackIcon}</span>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading={lazy ? 'lazy' : 'eager'}
      />
    </div>
  );
};

export default FoodImage;
