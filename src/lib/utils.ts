import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formata valores nutricionais
export const formatNutrientValue = (amount: number, unit: string): string => {
  if (amount < 1 && unit === 'g') {
    return `${(amount * 1000).toFixed(0)}mg`
  }
  return `${amount.toFixed(1)}${unit}`
}

// Formata preços
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

// Formata datas
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Calcula porcentagem de progresso
export const calculateProgress = (current: number, target: number): number => {
  return Math.min(100, Math.max(0, (current / target) * 100))
}

// Gera cor baseada na pontuação de saúde
export const getHealthScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-500'
  if (score >= 60) return 'text-yellow-500'
  if (score >= 40) return 'text-orange-500'
  return 'text-red-500'
}

// Gera cor de fundo baseada na pontuação de saúde
export const getHealthScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  if (score >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

// Converte status de preço para cor
export const getPriceStatusColor = (status: 'cheap' | 'average' | 'expensive'): string => {
  switch (status) {
    case 'cheap': return 'text-green-500'
    case 'expensive': return 'text-red-500'
    default: return 'text-yellow-500'
  }
}

// Converte objetivo para texto legível
export const getGoalText = (goal: 'bulk' | 'cut' | 'maintain'): string => {
  switch (goal) {
    case 'bulk': return 'Ganho de Massa'
    case 'cut': return 'Emagrecimento'
    case 'maintain': return 'Manutenção'
    default: return 'Indefinido'
  }
}

// Converte nível de atividade para texto
export const getActivityLevelText = (level: string): string => {
  switch (level) {
    case 'sedentary': return 'Sedentário'
    case 'light': return 'Levemente Ativo'
    case 'moderate': return 'Moderadamente Ativo'
    case 'active': return 'Muito Ativo'
    case 'very_active': return 'Extremamente Ativo'
    default: return 'Não Definido'
  }
}

// Gera ID único
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Debounce para otimizar buscas
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Valida código de barras
export const isValidBarcode = (barcode: string): boolean => {
  // Verifica se é um código de barras válido (EAN-13, UPC-A, etc.)
  const barcodeRegex = /^[0-9]{8,14}$/
  return barcodeRegex.test(barcode)
}

// Calcula IMC
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100
  return weight / (heightInMeters * heightInMeters)
}

// Interpreta IMC
export const interpretBMI = (bmi: number): { category: string; color: string } => {
  if (bmi < 18.5) return { category: 'Abaixo do peso', color: 'text-blue-500' }
  if (bmi < 25) return { category: 'Peso normal', color: 'text-green-500' }
  if (bmi < 30) return { category: 'Sobrepeso', color: 'text-yellow-500' }
  return { category: 'Obesidade', color: 'text-red-500' }
}

// Converte bytes para formato legível
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Trunca texto
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Capitaliza primeira letra
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Converte tempo para formato legível
export const timeAgo = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Agora mesmo'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} h atrás`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} dias atrás`
  
  return formatDate(date)
}