import React, { useState } from 'react'
import { useToast } from '../../contexts/ToastContext'
import type { UserProfile } from '../../types/user'
import './Profile.css'

const Profile: React.FC = () => {
  const { addToast } = useToast()
  
  // Mock user data - in realtà verrebbe dal context o API
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    email: 'user@mealbuddy.com',
    name: 'Mario Rossi',
    avatar: '',
    joinDate: new Date('2024-01-15'),
    totalRecipes: 42,
    completedMealPlans: 12,
    preferences: {
      dietaryRestrictions: [],
      allergies: [],
      favoriteCategories: [],
      cookingSkillLevel: 'intermediate',
      preferredCookingTime: 30,
      servingSize: 2
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)

  const dietaryOptions = [
    'Vegetariano', 'Vegano', 'Senza Glutine', 'Keto', 
    'Paleo', 'Mediterranea', 'Senza Lattosio'
  ]

  const allergyOptions = [
    'Glutine', 'Lattosio', 'Noci', 'Uova', 'Pesce', 
    'Crostacei', 'Soia', 'Sesamo'
  ]

  const categoryOptions = [
    'Primi Piatti', 'Secondi Piatti', 'Contorni', 'Dolci', 
    'Antipasti', 'Zuppe', 'Insalate', 'Pizza'
  ]

  const handleSave = () => {
    setProfile(formData)
    setIsEditing(false)
    addToast({
      type: 'success',
      title: 'Profilo aggiornato!',
      message: 'Le tue preferenze sono state salvate con successo.'
    })
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item]
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{profile.totalRecipes}</span>
              <span className="stat-label">Ricette Salvate</span>
            </div>
            <div className="stat">
              <span className="stat-number">{profile.completedMealPlans}</span>
              <span className="stat-label">Meal Plan Completati</span>
            </div>
          </div>
        </div>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Annulla' : 'Modifica Profilo'}
        </button>
      </div>

      <div className="profile-content">
        <div className="preferences-section">
          <h2>Preferenze Alimentari</h2>
          
          <div className="form-group">
            <label>Restrizioni Dietetiche</label>
            <div className="checkbox-grid">
              {dietaryOptions.map(option => (
                <label key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.preferences.dietaryRestrictions.includes(option)}
                    disabled={!isEditing}
                    onChange={() => {
                      if (isEditing) {
                        setFormData(prev => ({
                          ...prev,
                          preferences: {
                            ...prev.preferences,
                            dietaryRestrictions: toggleArrayItem(
                              prev.preferences.dietaryRestrictions, 
                              option
                            )
                          }
                        }))
                      }
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Allergie</label>
            <div className="checkbox-grid">
              {allergyOptions.map(option => (
                <label key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.preferences.allergies.includes(option)}
                    disabled={!isEditing}
                    onChange={() => {
                      if (isEditing) {
                        setFormData(prev => ({
                          ...prev,
                          preferences: {
                            ...prev.preferences,
                            allergies: toggleArrayItem(
                              prev.preferences.allergies, 
                              option
                            )
                          }
                        }))
                      }
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Categorie Preferite</label>
            <div className="checkbox-grid">
              {categoryOptions.map(option => (
                <label key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.preferences.favoriteCategories.includes(option)}
                    disabled={!isEditing}
                    onChange={() => {
                      if (isEditing) {
                        setFormData(prev => ({
                          ...prev,
                          preferences: {
                            ...prev.preferences,
                            favoriteCategories: toggleArrayItem(
                              prev.preferences.favoriteCategories, 
                              option
                            )
                          }
                        }))
                      }
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Livello di Cucina</label>
              <select
                value={formData.preferences.cookingSkillLevel}
                disabled={!isEditing}
                onChange={(e) => {
                  if (isEditing) {
                    setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        cookingSkillLevel: e.target.value as any
                      }
                    }))
                  }
                }}
              >
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzato</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tempo Preferito (minuti)</label>
              <input
                type="number"
                value={formData.preferences.preferredCookingTime}
                disabled={!isEditing}
                min="5"
                max="300"
                onChange={(e) => {
                  if (isEditing) {
                    setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        preferredCookingTime: parseInt(e.target.value)
                      }
                    }))
                  }
                }}
              />
            </div>

            <div className="form-group">
              <label>Porzioni</label>
              <input
                type="number"
                value={formData.preferences.servingSize}
                disabled={!isEditing}
                min="1"
                max="12"
                onChange={(e) => {
                  if (isEditing) {
                    setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        servingSize: parseInt(e.target.value)
                      }
                    }))
                  }
                }}
              />
            </div>
          </div>

          {isEditing && (
            <div className="form-actions">
              <button className="save-button" onClick={handleSave}>
                Salva Modifiche
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Annulla
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
