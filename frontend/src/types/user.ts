export interface UserPreferences {
  dietaryRestrictions: string[]
  allergies: string[]
  favoriteCategories: string[]
  cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced'
  preferredCookingTime: number // minutes
  servingSize: number
}

export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: UserPreferences
  joinDate: Date
  totalRecipes: number
  completedMealPlans: number
}
