"use client"

import { useState } from 'react'
import { Camera, Scan, TrendingUp, TrendingDown, DollarSign, Star, ArrowRight, Home, Search, User, BarChart3, Plus, Check, X, AlertTriangle, Zap, Target, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface NutrientInfo {
  name: string
  amount: number
  unit: string
  percentage: number
  color: string
}

interface FoodAnalysis {
  name: string
  calories: number
  nutrients: NutrientInfo[]
  healthScore: number
  priceStatus: 'cheap' | 'average' | 'expensive'
  price: number
  goal: 'bulk' | 'cut' | 'maintain'
  recommendation: string
  alternatives?: string[]
}

interface Goal {
  type: 'bulk' | 'cut' | 'maintain'
  dailyCalories: number
  protein: number
  carbs: number
  fat: number
}

export default function FitnessApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [isScanning, setIsScanning] = useState(false)
  const [currentGoal, setCurrentGoal] = useState<Goal>({
    type: 'bulk',
    dailyCalories: 2800,
    protein: 140,
    carbs: 350,
    fat: 93
  })

  const [todayProgress, setTodayProgress] = useState({
    calories: 1850,
    protein: 95,
    carbs: 220,
    fat: 65
  })

  const [recentAnalysis, setRecentAnalysis] = useState<FoodAnalysis[]>([
    {
      name: "Peito de Frango Grelhado",
      calories: 165,
      nutrients: [
        { name: "Proteína", amount: 31, unit: "g", percentage: 85, color: "bg-blue-500" },
        { name: "Carboidratos", amount: 0, unit: "g", percentage: 0, color: "bg-orange-500" },
        { name: "Gordura", amount: 3.6, unit: "g", percentage: 15, color: "bg-yellow-500" }
      ],
      healthScore: 95,
      priceStatus: 'average',
      price: 18.90,
      goal: 'bulk',
      recommendation: "Excelente para ganho de massa! Rico em proteína de alta qualidade.",
      alternatives: ["Peito de Peru", "Tilápia", "Ovos"]
    },
    {
      name: "Refrigerante Cola 350ml",
      calories: 139,
      nutrients: [
        { name: "Açúcar", amount: 37, unit: "g", percentage: 100, color: "bg-red-500" },
        { name: "Sódio", amount: 15, unit: "mg", percentage: 5, color: "bg-gray-500" }
      ],
      healthScore: 15,
      priceStatus: 'expensive',
      price: 4.50,
      goal: 'cut',
      recommendation: "Evite! Muitas calorias vazias e açúcar. Prejudica seus objetivos.",
      alternatives: ["Água com gás", "Chá gelado sem açúcar", "Água aromatizada"]
    }
  ])

  const mockFoodScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      const mockAnalysis: FoodAnalysis = {
        name: "Aveia em Flocos Integral",
        calories: 389,
        nutrients: [
          { name: "Carboidratos", amount: 66, unit: "g", percentage: 68, color: "bg-orange-500" },
          { name: "Proteína", amount: 17, unit: "g", percentage: 17, color: "bg-blue-500" },
          { name: "Gordura", amount: 7, unit: "g", percentage: 15, color: "bg-yellow-500" }
        ],
        healthScore: 88,
        priceStatus: 'cheap',
        price: 3.20,
        goal: 'bulk',
        recommendation: "Ótima escolha! Carboidrato complexo ideal para energia duradoura.",
        alternatives: ["Quinoa", "Arroz integral", "Batata doce"]
      }
      setRecentAnalysis(prev => [mockAnalysis, ...prev.slice(0, 4)])
      setIsScanning(false)
    }, 2000)
  }

  const getPriceIcon = (status: string) => {
    switch (status) {
      case 'cheap': return <TrendingDown className="w-4 h-4 text-green-500" />
      case 'expensive': return <TrendingUp className="w-4 h-4 text-red-500" />
      default: return <DollarSign className="w-4 h-4 text-yellow-500" />
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getGoalIcon = (goal: string) => {
    switch (goal) {
      case 'bulk': return <TrendingUp className="w-4 h-4 text-blue-500" />
      case 'cut': return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <Target className="w-4 h-4 text-gray-500" />
    }
  }

  const renderHome = () => (
    <div className="space-y-6">
      {/* Header com Meta Diária */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Meta Diária</h2>
              <p className="text-blue-100">Ganho de Massa</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{todayProgress.calories}</p>
              <p className="text-sm text-blue-100">de {currentGoal.dailyCalories} kcal</p>
            </div>
          </div>
          <Progress 
            value={(todayProgress.calories / currentGoal.dailyCalories) * 100} 
            className="h-2 bg-blue-800"
          />
        </CardContent>
      </Card>

      {/* Macros Progress */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-blue-400 font-bold text-lg">{todayProgress.protein}g</div>
            <div className="text-xs text-gray-400">Proteína</div>
            <Progress value={(todayProgress.protein / currentGoal.protein) * 100} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-orange-400 font-bold text-lg">{todayProgress.carbs}g</div>
            <div className="text-xs text-gray-400">Carboidratos</div>
            <Progress value={(todayProgress.carbs / currentGoal.carbs) * 100} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-yellow-400 font-bold text-lg">{todayProgress.fat}g</div>
            <div className="text-xs text-gray-400">Gordura</div>
            <Progress value={(todayProgress.fat / currentGoal.fat) * 100} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Scanner Button */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <Button 
            onClick={mockFoodScan}
            disabled={isScanning}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-6 text-lg font-semibold"
          >
            {isScanning ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analisando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Scan className="w-6 h-6" />
                Escanear Alimento
              </div>
            )}
          </Button>
          <p className="text-center text-gray-400 text-sm mt-2">
            Escaneie código de barras ou tire foto do prato
          </p>
        </CardContent>
      </Card>

      {/* Análises Recentes */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Análises Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentAnalysis.slice(0, 3).map((analysis, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{analysis.name}</h4>
                  <p className="text-gray-400 text-sm">{analysis.calories} kcal</p>
                </div>
                <div className="flex items-center gap-2">
                  {getPriceIcon(analysis.priceStatus)}
                  <span className={`text-sm font-bold ${getHealthColor(analysis.healthScore)}`}>
                    {analysis.healthScore}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {getGoalIcon(analysis.goal)}
                <Badge variant={analysis.healthScore >= 70 ? "default" : "destructive"} className="text-xs">
                  {analysis.healthScore >= 70 ? "Recomendado" : "Evitar"}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm">{analysis.recommendation}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Análise Nutricional</h2>
        <p className="text-gray-400">Histórico completo das suas análises</p>
      </div>

      {recentAnalysis.map((analysis, index) => (
        <Card key={index} className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{analysis.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-gray-300">{analysis.calories} kcal</span>
                  <span className="text-gray-300">R$ {analysis.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    {getPriceIcon(analysis.priceStatus)}
                    <span className="text-sm text-gray-400 capitalize">{analysis.priceStatus}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getHealthColor(analysis.healthScore)}`}>
                  {analysis.healthScore}
                </div>
                <div className="text-sm text-gray-400">Nota Saúde</div>
              </div>
            </div>

            {/* Nutrientes */}
            <div className="space-y-3 mb-4">
              {analysis.nutrients.map((nutrient, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{nutrient.name}</span>
                    <span className="text-white">{nutrient.amount}{nutrient.unit}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${nutrient.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(nutrient.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recomendação */}
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                {analysis.healthScore >= 70 ? (
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                )}
                <div>
                  <p className="text-white text-sm font-medium mb-1">Recomendação</p>
                  <p className="text-gray-300 text-sm">{analysis.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Alternativas */}
            {analysis.alternatives && (
              <div>
                <p className="text-white text-sm font-medium mb-2">Alternativas mais saudáveis:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.alternatives.map((alt, idx) => (
                    <Badge key={idx} variant="outline" className="text-green-400 border-green-400">
                      {alt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderScanner = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Scanner Inteligente</h2>
        <p className="text-gray-400">Escaneie produtos ou fotografe pratos</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-8 text-center">
          <div className="bg-gray-700 rounded-lg p-8 mb-6">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-4">Posicione o código de barras ou o prato na câmera</p>
            <Button 
              onClick={mockFoodScan}
              disabled={isScanning}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              {isScanning ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Analisando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Scan className="w-5 h-5" />
                  Iniciar Scanner
                </div>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-700 rounded-lg p-4">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-medium">Análise Instantânea</p>
              <p className="text-gray-400">Nutrientes em segundos</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <ShoppingCart className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-white font-medium">Preço Inteligente</p>
              <p className="text-gray-400">Compare e economize</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dicas de Uso */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Como usar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold">1</div>
            <div>
              <p className="text-white font-medium">Código de Barras</p>
              <p className="text-gray-400 text-sm">Escaneie produtos industrializados para análise completa</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold">2</div>
            <div>
              <p className="text-white font-medium">Foto do Prato</p>
              <p className="text-gray-400 text-sm">Fotografe refeições para identificar ingredientes</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold">3</div>
            <div>
              <p className="text-white font-medium">Receba Análise</p>
              <p className="text-gray-400 text-sm">Veja nutrientes, preço e recomendações personalizadas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Seu Perfil</h2>
        <p className="text-gray-400">Configurações e metas pessoais</p>
      </div>

      {/* Meta Atual */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Meta Atual: Ganho de Massa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">{currentGoal.dailyCalories}</p>
              <p className="text-gray-400 text-sm">Calorias/dia</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-400">+0.5kg</p>
              <p className="text-gray-400 text-sm">Meta semanal</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Proteína</span>
              <span className="text-blue-400 font-bold">{currentGoal.protein}g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Carboidratos</span>
              <span className="text-orange-400 font-bold">{currentGoal.carbs}g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Gordura</span>
              <span className="text-yellow-400 font-bold">{currentGoal.fat}g</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Estatísticas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Alimentos analisados</span>
            <span className="text-white font-bold">127</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Economia total</span>
            <span className="text-green-400 font-bold">R$ 89,50</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Dias consecutivos</span>
            <span className="text-blue-400 font-bold">12</span>
          </div>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Configurações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-between text-white border-gray-600">
            Alterar Meta
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between text-white border-gray-600">
            Preferências Alimentares
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between text-white border-gray-600">
            Notificações
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">NutriSmart</h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'analysis' && renderAnalysis()}
        {activeTab === 'scanner' && renderScanner()}
        {activeTab === 'profile' && renderProfile()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`p-4 text-center ${activeTab === 'home' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <Home className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Início</span>
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`p-4 text-center ${activeTab === 'scanner' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <Scan className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Scanner</span>
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`p-4 text-center ${activeTab === 'analysis' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <BarChart3 className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Análises</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`p-4 text-center ${activeTab === 'profile' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <User className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  )
}