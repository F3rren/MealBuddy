import React, { useState, useEffect, useRef } from 'react'
import './AdvancedSearch.css'

export interface SearchFilters {
  ingredients: string[]
  maxCookingTime: number
  difficulty: 'easy' | 'medium' | 'hard' | 'all'
  category: string
  dietary: string[]
  servings: number
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void
  onVoiceSearch?: () => void
  suggestions?: string[]
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  onVoiceSearch,
  suggestions = []
}) => {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const [filters, setFilters] = useState<SearchFilters>({
    ingredients: [],
    maxCookingTime: 60,
    difficulty: 'all',
    category: '',
    dietary: [],
    servings: 2
  })

  const categories = [
    'Tutti', 'Primi Piatti', 'Secondi Piatti', 'Contorni', 
    'Dolci', 'Antipasti', 'Zuppe', 'Insalate'
  ]

  const dietaryOptions = [
    'Vegetariano', 'Vegano', 'Senza Glutine', 'Keto', 'Paleo'
  ]

  // Filtra i suggerimenti in base alla query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [query, suggestions])

  // Chiudi suggerimenti quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    onSearch(query, filters)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    onSearch(suggestion, filters)
  }

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Il riconoscimento vocale non è supportato in questo browser')
      return
    }

    setIsListening(true)
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = 'it-IT'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
      setIsListening(false)
      onSearch(transcript, filters)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
    if (onVoiceSearch) onVoiceSearch()
  }

  const addIngredient = (ingredient: string) => {
    if (ingredient && !filters.ingredients.includes(ingredient)) {
      setFilters(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient]
      }))
    }
  }

  const removeIngredient = (ingredient: string) => {
    setFilters(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ingredient)
    }))
  }

  const toggleDietaryOption = (option: string) => {
    setFilters(prev => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter(d => d !== option)
        : [...prev.dietary, option]
    }))
  }

  const clearFilters = () => {
    setFilters({
      ingredients: [],
      maxCookingTime: 60,
      difficulty: 'all',
      category: '',
      dietary: [],
      servings: 2
    })
  }

  return (
    <div className="advanced-search">
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Cerca ricette, ingredienti..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="search-input"
          />
          
          <div className="search-actions">
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`voice-button ${isListening ? 'listening' : ''}`}
              title="Ricerca vocale"
              disabled={isListening}
            >
              {isListening ? '🎤' : '🎙️'}
            </button>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`filter-button ${showFilters ? 'active' : ''}`}
              title="Filtri avanzati"
            >
              🔧
            </button>
            
            <button
              type="button"
              onClick={handleSearch}
              className="search-button"
              title="Cerca"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Suggerimenti */}
        {showSuggestions && (
          <div ref={suggestionsRef} className="suggestions-dropdown">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                🔍 {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filtri Avanzati */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filtri Avanzati</h3>
            <button onClick={clearFilters} className="clear-filters">
              Pulisci Filtri
            </button>
          </div>

          <div className="filters-grid">
            {/* Ingredienti */}
            <div className="filter-group">
              <label>Ingredienti</label>
              <div className="ingredient-input">
                <input
                  type="text"
                  placeholder="Aggiungi ingrediente..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addIngredient(e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
              </div>
              <div className="ingredients-list">
                {filters.ingredients.map((ingredient, index) => (
                  <span key={index} className="ingredient-tag">
                    {ingredient}
                    <button onClick={() => removeIngredient(ingredient)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tempo di Cottura */}
            <div className="filter-group">
              <label>Tempo Massimo: {filters.maxCookingTime} min</label>
              <input
                type="range"
                min="5"
                max="180"
                value={filters.maxCookingTime}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  maxCookingTime: parseInt(e.target.value)
                }))}
                className="time-slider"
              />
            </div>

            {/* Difficoltà */}
            <div className="filter-group">
              <label>Difficoltà</label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  difficulty: e.target.value as any
                }))}
              >
                <option value="all">Tutte</option>
                <option value="easy">Facile</option>
                <option value="medium">Media</option>
                <option value="hard">Difficile</option>
              </select>
            </div>

            {/* Categoria */}
            <div className="filter-group">
              <label>Categoria</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  category: e.target.value
                }))}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'Tutti' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Porzioni */}
            <div className="filter-group">
              <label>Porzioni: {filters.servings}</label>
              <input
                type="range"
                min="1"
                max="12"
                value={filters.servings}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  servings: parseInt(e.target.value)
                }))}
                className="servings-slider"
              />
            </div>

            {/* Opzioni Dietetiche */}
            <div className="filter-group dietary-options">
              <label>Opzioni Dietetiche</label>
              <div className="dietary-grid">
                {dietaryOptions.map(option => (
                  <label key={option} className="dietary-option">
                    <input
                      type="checkbox"
                      checked={filters.dietary.includes(option)}
                      onChange={() => toggleDietaryOption(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedSearch
