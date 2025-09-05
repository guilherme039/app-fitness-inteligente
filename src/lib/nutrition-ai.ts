import { FoodAnalysis, NutrientInfo, PriceComparison, SmartSuggestion } from './types'

// Simula análise de código de barras
export const analyzeBarcodeProduct = async (barcode: string): Promise<FoodAnalysis> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const mockProducts: Record<string, Partial<FoodAnalysis>> = {
    '7891000100103': {
      name: 'Leite Integral 1L',
      calories: 60,
      nutrients: [
        { name: 'Proteína', amount: 3.2, unit: 'g', percentage: 20, color: 'bg-blue-500' },
        { name: 'Carboidratos', amount: 4.5, unit: 'g', percentage: 28, color: 'bg-orange-500' },
        { name: 'Gordura', amount: 3.5, unit: 'g', percentage: 52, color: 'bg-yellow-500' },
        { name: 'Cálcio', amount: 125, unit: 'mg', percentage: 12, color: 'bg-green-500' }
      ],
      healthScore: 75,
      priceStatus: 'average' as const,
      price: 4.89,
      recommendation: 'Boa fonte de proteína e cálcio. Ideal para pós-treino.',
      alternatives: ['Leite desnatado', 'Bebida vegetal fortificada', 'Iogurte natural']
    },
    '7891000053508': {
      name: 'Biscoito Recheado Chocolate',
      calories: 465,
      nutrients: [
        { name: 'Carboidratos', amount: 65, unit: 'g', percentage: 56, color: 'bg-orange-500' },
        { name: 'Gordura', amount: 18, unit: 'g', percentage: 35, color: 'bg-yellow-500' },
        { name: 'Açúcar', amount: 28, unit: 'g', percentage: 43, color: 'bg-red-500' },
        { name: 'Proteína', amount: 6, unit: 'g', percentage: 9, color: 'bg-blue-500' }
      ],
      healthScore: 25,
      priceStatus: 'expensive' as const,
      price: 3.79,
      recommendation: 'Alto em açúcar e gordura trans. Evite ou consuma com moderação.',
      alternatives: ['Biscoito integral', 'Frutas secas', 'Castanhas', 'Chocolate 70% cacau']
    }
  }

  const product = mockProducts[barcode] || {
    name: 'Produto Desconhecido',
    calories: 200,
    nutrients: [
      { name: 'Carboidratos', amount: 30, unit: 'g', percentage: 60, color: 'bg-orange-500' },
      { name: 'Proteína', amount: 8, unit: 'g', percentage: 16, color: 'bg-blue-500' },
      { name: 'Gordura', amount: 5, unit: 'g', percentage: 24, color: 'bg-yellow-500' }
    ],
    healthScore: 50,
    priceStatus: 'average' as const,
    price: 5.99,
    recommendation: 'Produto não encontrado em nossa base. Verifique o rótulo.',
    alternatives: []
  }

  return {
    id: `analysis_${Date.now()}`,
    barcode,
    timestamp: new Date(),
    goal: 'maintain',
    ...product
  } as FoodAnalysis
}

// Simula análise de imagem de prato
export const analyzeFoodImage = async (imageData: string): Promise<FoodAnalysis> => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const mockDishes = [
    {
      name: 'Prato Fitness - Frango, Arroz e Brócolis',
      calories: 420,
      nutrients: [
        { name: 'Proteína', amount: 35, unit: 'g', percentage: 33, color: 'bg-blue-500' },
        { name: 'Carboidratos', amount: 45, unit: 'g', percentage: 43, color: 'bg-orange-500' },
        { name: 'Gordura', amount: 8, unit: 'g', percentage: 17, color: 'bg-yellow-500' },
        { name: 'Fibras', amount: 6, unit: 'g', percentage: 7, color: 'bg-green-500' }
      ],
      healthScore: 92,
      priceStatus: 'cheap' as const,
      price: 12.50,
      recommendation: 'Excelente combinação para ganho de massa! Proteína completa e carboidratos de qualidade.',
      alternatives: ['Salmão grelhado', 'Batata doce', 'Aspargos']
    },
    {
      name: 'Pizza Margherita - 2 fatias',
      calories: 580,
      nutrients: [
        { name: 'Carboidratos', amount: 68, unit: 'g', percentage: 47, color: 'bg-orange-500' },
        { name: 'Gordura', amount: 22, unit: 'g', percentage: 34, color: 'bg-yellow-500' },
        { name: 'Proteína', amount: 24, unit: 'g', percentage: 17, color: 'bg-blue-500' },
        { name: 'Sódio', amount: 1200, unit: 'mg', percentage: 2, color: 'bg-red-500' }
      ],
      healthScore: 45,
      priceStatus: 'expensive' as const,
      price: 28.90,
      recommendation: 'Alto em calorias e sódio. Se for consumir, balance com salada e reduza outras refeições.',
      alternatives: ['Pizza integral caseira', 'Wrap de frango', 'Sanduíche natural']
    }
  ]

  const dish = mockDishes[Math.floor(Math.random() * mockDishes.length)]
  
  return {
    id: `analysis_${Date.now()}`,
    image: imageData,
    timestamp: new Date(),
    goal: 'bulk',
    ...dish
  } as FoodAnalysis
}

// Compara preços de produtos
export const compareProductPrices = async (productName: string): Promise<PriceComparison> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const basePrice = Math.random() * 20 + 5
  
  return {
    product: productName,
    currentPrice: basePrice,
    averagePrice: basePrice * 0.9,
    lowestPrice: basePrice * 0.7,
    highestPrice: basePrice * 1.3,
    trend: ['rising', 'falling', 'stable'][Math.floor(Math.random() * 3)] as any,
    stores: [
      { name: 'Supermercado A', price: basePrice * 0.85, distance: 1.2 },
      { name: 'Supermercado B', price: basePrice * 1.1, distance: 2.5 },
      { name: 'Supermercado C', price: basePrice * 0.95, distance: 0.8 },
      { name: 'Atacadão D', price: basePrice * 0.75, distance: 5.2 }
    ]
  }
}

// Gera sugestões inteligentes
export const generateSmartSuggestions = (analysis: FoodAnalysis): SmartSuggestion[] => {
  const suggestions: SmartSuggestion[] = []
  
  if (analysis.healthScore < 60) {
    suggestions.push({
      id: `suggestion_${Date.now()}_1`,
      type: 'substitute',
      originalProduct: analysis.name,
      suggestedProduct: analysis.alternatives?.[0] || 'Opção mais saudável',
      reason: 'Produto com baixa qualidade nutricional',
      healthImprovement: 30,
      costSaving: analysis.priceStatus === 'expensive' ? 15 : 0,
      availability: 'high'
    })
  }
  
  if (analysis.priceStatus === 'expensive') {
    suggestions.push({
      id: `suggestion_${Date.now()}_2`,
      type: 'substitute',
      originalProduct: analysis.name,
      suggestedProduct: 'Versão genérica ou marca própria',
      reason: 'Produto com preço acima da média',
      healthImprovement: 0,
      costSaving: 25,
      availability: 'high'
    })
  }
  
  // Sugestão de complemento baseada nos nutrientes
  const proteinNutrient = analysis.nutrients.find(n => n.name.toLowerCase().includes('proteína'))
  if (proteinNutrient && proteinNutrient.amount < 10) {
    suggestions.push({
      id: `suggestion_${Date.now()}_3`,
      type: 'complement',
      originalProduct: analysis.name,
      suggestedProduct: 'Fonte de proteína (ovos, frango, leguminosas)',
      reason: 'Baixo teor de proteína para seus objetivos',
      healthImprovement: 20,
      costSaving: 0,
      availability: 'high'
    })
  }
  
  return suggestions
}

// Calcula macros ideais baseado no objetivo
export const calculateIdealMacros = (
  weight: number, 
  goal: 'bulk' | 'cut' | 'maintain',
  activityLevel: string = 'moderate'
): { calories: number; protein: number; carbs: number; fat: number } => {
  let baseCalories = weight * 24 // BMR aproximado
  
  // Ajuste por nível de atividade
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  }
  
  baseCalories *= activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.55
  
  // Ajuste por objetivo
  let targetCalories = baseCalories
  if (goal === 'bulk') targetCalories += 300
  if (goal === 'cut') targetCalories -= 500
  
  // Distribuição de macros
  const protein = weight * (goal === 'bulk' ? 2.2 : goal === 'cut' ? 2.5 : 2.0)
  const fat = targetCalories * 0.25 / 9 // 25% das calorias
  const carbs = (targetCalories - (protein * 4) - (fat * 9)) / 4
  
  return {
    calories: Math.round(targetCalories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat)
  }
}

// Avalia se um alimento é adequado para o objetivo
export const evaluateFoodForGoal = (
  analysis: FoodAnalysis, 
  goal: 'bulk' | 'cut' | 'maintain'
): { score: number; recommendation: string } => {
  let score = analysis.healthScore
  
  const proteinNutrient = analysis.nutrients.find(n => n.name.toLowerCase().includes('proteína'))
  const carbNutrient = analysis.nutrients.find(n => n.name.toLowerCase().includes('carboidrato'))
  const fatNutrient = analysis.nutrients.find(n => n.name.toLowerCase().includes('gordura'))
  
  if (goal === 'bulk') {
    // Para ganho de massa, valoriza proteína e calorias
    if (proteinNutrient && proteinNutrient.amount > 20) score += 10
    if (analysis.calories > 300) score += 5
    if (carbNutrient && carbNutrient.amount > 30) score += 5
  } else if (goal === 'cut') {
    // Para emagrecimento, valoriza baixas calorias e alta saciedade
    if (analysis.calories < 200) score += 10
    if (proteinNutrient && proteinNutrient.amount > 15) score += 10
    const fiberNutrient = analysis.nutrients.find(n => n.name.toLowerCase().includes('fibra'))
    if (fiberNutrient && fiberNutrient.amount > 5) score += 5
  }
  
  // Penaliza açúcar excessivo
  const sugarNutrient = analysis.nutrients.find(n => n.name.toLowerCase().includes('açúcar'))
  if (sugarNutrient && sugarNutrient.amount > 20) score -= 15
  
  let recommendation = ''
  if (score >= 80) {
    recommendation = `Excelente escolha para ${goal === 'bulk' ? 'ganho de massa' : goal === 'cut' ? 'emagrecimento' : 'manutenção'}!`
  } else if (score >= 60) {
    recommendation = `Opção moderada. ${goal === 'bulk' ? 'Pode incluir ocasionalmente' : 'Consuma com moderação'}.`
  } else {
    recommendation = `Evite ou limite o consumo. ${goal === 'cut' ? 'Prejudica o emagrecimento' : 'Não contribui para seus objetivos'}.`
  }
  
  return { score: Math.min(100, Math.max(0, score)), recommendation }
}