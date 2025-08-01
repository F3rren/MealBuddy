// Hook per gestire immagini di cibo con fallback multipli
import { useState, useEffect } from 'react';

interface FoodImageSource {
  url: string;
  source: 'unsplash' | 'placeholder' | 'local' | 'custom';
  quality?: 'low' | 'medium' | 'high';
}

interface UseFoodImagesOptions {
  category?: string;
  fallbackCategory?: string;
  quality?: 'low' | 'medium' | 'high';
}

export const useFoodImages = (searchTerm: string, options: UseFoodImagesOptions = {}) => {
  const { category = 'food', fallbackCategory = 'meal', quality = 'medium' } = options;
  const [images, setImages] = useState<FoodImageSource[]>([]);

  const getQualityParams = (quality: string) => {
    switch (quality) {
      case 'low': return 'w=200&h=150';
      case 'medium': return 'w=400&h=300';
      case 'high': return 'w=800&h=600';
      default: return 'w=400&h=300';
    }
  };

  useEffect(() => {
    const generateImageSources = (): FoodImageSource[] => {
      const qualityParams = getQualityParams(quality);
      const encodedTerm = encodeURIComponent(searchTerm);

      return [
        // Unsplash - Ricerca specifica
        {
          url: `https://images.unsplash.com/photo-1504674900247-0877df9cc836?${qualityParams}&fit=crop&crop=faces`,
          source: 'unsplash',
          quality
        },
        // Unsplash - Categoria generica
        {
          url: `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?${qualityParams}&fit=crop&crop=faces`,
          source: 'unsplash',
          quality
        },
        // Unsplash - Fallback
        {
          url: `https://images.unsplash.com/photo-1476124369491-e7addf5db371?${qualityParams}&fit=crop&crop=faces`,
          source: 'unsplash',
          quality
        },
        // Placeholder finale
        {
          url: `https://via.placeholder.com/400x300/f3f4f6/6b7280?text=${encodedTerm}`,
          source: 'placeholder',
          quality
        }
      ];
    };

    setImages(generateImageSources());
  }, [searchTerm, category, fallbackCategory, quality]);

  return { images };
};

// Collezione predefinita di immagini per categorie comuni
export const FOOD_IMAGE_COLLECTIONS = {
  pasta: [
    "https://images.unsplash.com/photo-1621996346565-e3dbc353d524?w=400&h=300&fit=crop&crop=faces", // Carbonara
    "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop&crop=faces", // Spaghetti
    "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&crop=faces"  // Pasta salad
  ],
  pizza: [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=faces", // Margherita
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=faces", // Pizza slice
    "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&crop=faces"  // Pepperoni
  ],
  dessert: [
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=faces", // Cake
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop&crop=faces", // Cookies
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&crop=faces"  // Ice cream
  ],
  salad: [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=faces", // Salad bowl
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=faces", // Caesar salad
    "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=faces"  // Greek salad
  ],
  soup: [
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&crop=faces", // Soup bowl
    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&crop=faces", // Mushroom soup
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=faces"  // Tomato soup
  ],
  breakfast: [
    "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&h=300&fit=crop&crop=faces", // Breakfast plate
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=faces", // Pancakes
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop&crop=faces"  // Toast
  ],
  meat: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=faces", // Steak
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=faces", // Grilled meat
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=faces"  // Burger
  ],
  vegetables: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=faces", // Fresh vegetables
    "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop&crop=faces", // Roasted vegetables
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=faces"  // Vegetable salad
  ]
};

// Funzione per ottenere un'immagine casuale da una categoria
export const getRandomFoodImage = (category: keyof typeof FOOD_IMAGE_COLLECTIONS = 'breakfast'): string => {
  const images = FOOD_IMAGE_COLLECTIONS[category];
  return images[Math.floor(Math.random() * images.length)];
};

// Funzione per ottenere un'immagine basata sul nome del piatto
export const getFoodImageByName = (dishName: string): string => {
  const lowercaseName = dishName.toLowerCase();
  
  // Matching intelligente basato su parole chiave
  if (lowercaseName.includes('pasta') || lowercaseName.includes('spaghetti') || lowercaseName.includes('carbonara')) {
    return getRandomFoodImage('pasta');
  }
  if (lowercaseName.includes('pizza')) {
    return getRandomFoodImage('pizza');
  }
  if (lowercaseName.includes('dolce') || lowercaseName.includes('cake') || lowercaseName.includes('torta')) {
    return getRandomFoodImage('dessert');
  }
  if (lowercaseName.includes('insalata') || lowercaseName.includes('salad')) {
    return getRandomFoodImage('salad');
  }
  if (lowercaseName.includes('zuppa') || lowercaseName.includes('soup')) {
    return getRandomFoodImage('soup');
  }
  if (lowercaseName.includes('colazione') || lowercaseName.includes('breakfast')) {
    return getRandomFoodImage('breakfast');
  }
  if (lowercaseName.includes('carne') || lowercaseName.includes('meat') || lowercaseName.includes('steak')) {
    return getRandomFoodImage('meat');
  }
  if (lowercaseName.includes('verdura') || lowercaseName.includes('vegetable')) {
    return getRandomFoodImage('vegetables');
  }
  
  // Default: immagine casuale da breakfast
  return getRandomFoodImage('breakfast');
};
