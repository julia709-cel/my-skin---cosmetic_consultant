import api from './api';

export interface QuizAnswers {
  skinType: 'oily' | 'dry' | 'normal' | 'combination';
  problems: string[];
  goal: 'hydration' | 'anti-aging' | 'cleansing' | 'protection';
}

export interface ProductRecommendation {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    skinType: string[];
    problems: string[];
    goal: string[];
    imageUrl: string;
  };
  score: number;
  reason: string;
}

export interface QuizResult {
  count: number;
  recommendations: ProductRecommendation[];
}

export interface QuizHistory {
  id: number;
  skinType: string;
  problems: string[];
  goal: string;
  recommendations: Array<{
    productId: number;
    score: number;
    reason: string;
  }>;
  createdAt: string;
}

export const quizService = {
  // Получить рекомендации
  async getRecommendations(answers: QuizAnswers): Promise<QuizResult> {
    const response = await api.post<QuizResult>('/quiz/recommend', answers);
    return response.data;
  },

  // Получить историю квизов
  async getHistory(): Promise<{ history: QuizHistory[] }> {
    const response = await api.get('/quiz/history');
    return response.data;
  },
};