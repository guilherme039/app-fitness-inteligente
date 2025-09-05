export interface NutrientInfo {
  name: string
  amount: number
  unit: string
  percentage: number
  color: string
}

export interface FoodAnalysis {
  id: string
  name: string
  calories: number
  nutrients: NutrientInfo[]
  healthScore: number
  priceStatus: 'cheap' | 'average' | 'expensive'
  price: number
  goal: 'bulk' | 'cut' | 'maintain'
  recommendation: string
  alternatives?: string[]
  timestamp: Date
  barcode?: string
  image?: string
}

export interface UserGoal {
  type: 'bulk' | 'cut' | 'maintain'
  dailyCalories: number
  protein: number
  carbs: number
  fat: number
  targetWeight?: number
  currentWeight?: number
  weeklyGoal?: number
}

export interface DailyProgress {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  meals: FoodAnalysis[]
}

export interface UserProfile {
  id: string
  name: string
  age: number
  gender: 'male' | 'female'
  height: number
  weight: number
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal: UserGoal
  preferences: {
    dietaryRestrictions: string[]
    allergies: string[]
    preferredCuisines: string[]
  }
  stats: {
    totalAnalyses: number
    totalSavings: number
    consecutiveDays: number
    joinDate: Date
  }
}

export interface PriceComparison {
  product: string
  currentPrice: number
  averagePrice: number
  lowestPrice: number
  highestPrice: number
  trend: 'rising' | 'falling' | 'stable'
  stores: {
    name: string
    price: number
    distance?: number
  }[]
}

export interface NutritionRecommendation {
  type: 'warning' | 'suggestion' | 'achievement'
  title: string
  message: string
  action?: string
  priority: 'low' | 'medium' | 'high'
}

export interface SmartSuggestion {
  id: string
  type: 'substitute' | 'complement' | 'avoid'
  originalProduct: string
  suggestedProduct: string
  reason: string
  healthImprovement: number
  costSaving: number
  availability: 'high' | 'medium' | 'low'
}