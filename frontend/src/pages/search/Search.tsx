import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '../../contexts/ToastContext';
import type { Recipe } from '../../types/recipe';
import { MOCK_RECIPES } from '../../data/recipes';

interface SearchFilters {
  query: string;
  category: string;
  difficulty: string;
  maxTime: number;
  ingredients: string[];
  dietary: string[];
}

interface VoiceSearchState {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
}

const Search: React.FC = () => {
  const { addToast } = useToast();
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    difficulty: '',
    maxTime: 120,
    ingredients: [],
    dietary: []
  });

  // Voice Search State
  const [voiceSearch, setVoiceSearch] = useState<VoiceSearchState>({
    isListening: false,
    isSupported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
    transcript: ''
  });

  const recognitionRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (voiceSearch.isSupported) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'it-IT';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceSearch(prev => ({ ...prev, transcript, isListening: false }));
        setFilters(prev => ({ ...prev, query: transcript }));
        addToast({
          title: 'Ricerca Vocale',
          message: 'Ricerca vocale completata!',
          type: 'success'
        });
      };

      recognitionRef.current.onerror = () => {
        setVoiceSearch(prev => ({ ...prev, isListening: false }));
        addToast({
          title: 'Errore',
          message: 'Errore nella ricerca vocale',
          type: 'error'
        });
      };

      recognitionRef.current.onend = () => {
        setVoiceSearch(prev => ({ ...prev, isListening: false }));
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [voiceSearch.isSupported, addToast]);

  // Search function
  const performSearch = (searchFilters: SearchFilters) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredResults = MOCK_RECIPES;

      // Filter by query
      if (searchFilters.query) {
        const query = searchFilters.query.toLowerCase();
        filteredResults = filteredResults.filter(recipe =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description?.toLowerCase().includes(query) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // Filter by category
      if (searchFilters.category) {
        filteredResults = filteredResults.filter(recipe =>
          recipe.tags.includes(searchFilters.category)
        );
      }

      // Filter by difficulty
      if (searchFilters.difficulty) {
        filteredResults = filteredResults.filter(recipe =>
          recipe.difficulty === searchFilters.difficulty
        );
      }

      // Filter by max cooking time
      const maxMinutes = searchFilters.maxTime;
      filteredResults = filteredResults.filter(recipe => {
        const cookTime = parseInt(recipe.cookTime);
        return cookTime <= maxMinutes;
      });

      // Filter by ingredients
      if (searchFilters.ingredients.length > 0) {
        filteredResults = filteredResults.filter(recipe =>
          searchFilters.ingredients.every(ingredient =>
            recipe.name.toLowerCase().includes(ingredient.toLowerCase()) ||
            recipe.description?.toLowerCase().includes(ingredient.toLowerCase())
          )
        );
      }

      setResults(filteredResults);
      setLoading(false);
    }, 800);
  };

  // Handle search
  const handleSearch = () => {
    performSearch(filters);
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    if (!voiceSearch.isSupported) {
      addToast({
        title: 'Errore',
        message: 'Ricerca vocale non supportata',
        type: 'error'
      });
      return;
    }

    if (voiceSearch.isListening) {
      recognitionRef.current.stop();
    } else {
      setVoiceSearch(prev => ({ ...prev, isListening: true }));
      recognitionRef.current.start();
      addToast({
        title: 'Ricerca Vocale',
        message: 'Parla ora...',
        type: 'info'
      });
    }
  };

  // Auto-search on filter change
  useEffect(() => {
    if (filters.query || filters.category || filters.difficulty || filters.ingredients.length > 0) {
      const debounce = setTimeout(() => {
        performSearch(filters);
      }, 500);
      return () => clearTimeout(debounce);
    } else {
      setResults([]);
    }
  }, [filters]);

  // Handle ingredient addition
  const addIngredient = (ingredient: string) => {
    if (ingredient && !filters.ingredients.includes(ingredient)) {
      setFilters(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient]
      }));
    }
  };

  // Handle ingredient removal
  const removeIngredient = (ingredient: string) => {
    setFilters(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ingredient)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Trova la Ricetta Perfetta
        </h1>
        <p className="text-xl text-gray-600">
          Cerca tra migliaia di ricette con filtri avanzati e ricerca vocale
        </p>
      </div>

      {/* Advanced Search Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Main Search Bar */}
        <div className="relative mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Cerca ricette, ingredienti, categorie..."
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                {/* Voice Search Button */}
                {voiceSearch.isSupported && (
                  <button
                    onClick={handleVoiceSearch}
                    disabled={voiceSearch.isListening}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      voiceSearch.isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                    }`}
                    title={voiceSearch.isListening ? 'Sto ascoltando...' : 'Ricerca vocale'}
                  >
                    🎤
                  </button>
                )}
                
                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  🔍
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="">Tutte le categorie</option>
              <option value="Italiana">Italiana</option>
              <option value="Vegetariana">Vegetariana</option>
              <option value="Veloce">Veloce</option>
              <option value="Dessert">Dessert</option>
              <option value="Pasta">Pasta</option>
              <option value="Pizza">Pizza</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficoltà
            </label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="">Qualsiasi</option>
              <option value="Facile">Facile</option>
              <option value="Media">Media</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          {/* Time Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempo massimo: {filters.maxTime} min
            </label>
            <input
              type="range"
              min="10"
              max="180"
              step="10"
              value={filters.maxTime}
              onChange={(e) => setFilters(prev => ({ ...prev, maxTime: parseInt(e.target.value) }))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10m</span>
              <span>3h</span>
            </div>
          </div>
        </div>

        {/* Ingredients Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredienti specifici
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {filters.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Aggiungi ingrediente..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addIngredient(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
            />
            <button
              onClick={() => {
                const input = document.querySelector('input[placeholder="Aggiungi ingrediente..."]') as HTMLInputElement;
                if (input?.value) {
                  addIngredient(input.value);
                  input.value = '';
                }
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Aggiungi
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Risultati della Ricerca
          </h2>
          {results.length > 0 && (
            <span className="text-gray-600">
              {results.length} ricette trovate
            </span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Sto cercando le migliori ricette...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nessun risultato trovato
            </h3>
            <p className="text-gray-600">
              Prova a modificare i filtri di ricerca o usa termini diversi
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((recipe) => (
              <div
                key={recipe.name}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-sm font-medium">
                    ⭐ {recipe.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {recipe.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      ⏰ {recipe.cookTime}
                    </span>
                    <span className="text-sm text-gray-500">
                      👨‍🍳 {recipe.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">
                      🍽️ {recipe.servings} porzioni
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-medium">
                    Visualizza Ricetta
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
