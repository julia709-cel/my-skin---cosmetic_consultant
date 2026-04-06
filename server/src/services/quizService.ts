import Product from '../models/Product';
import { Op } from 'sequelize';

export interface QuizAnswers {
  skinType: string; // 'oily' | 'dry' | 'normal' | 'combination'
  problems: string[]; // ['acne', 'wrinkles', 'dryness', 'pigmentation']
  goal: string; // 'hydration' | 'anti-aging' | 'cleansing' | 'protection'
}

export interface ProductRecommendation {
  product: Product;
  score: number;
  reason: string;
}

export class QuizService {
  /**
   * Алгоритм подбора косметики
   * 1. Фильтрует товары по типу кожи
   * 2. Приоритезирует по проблемам
   * 3. Сортирует по цели ухода
   */
  async getRecommendations(answers: QuizAnswers): Promise<ProductRecommendation[]> {
    const { skinType, problems, goal } = answers;

    // Получаем все товары из БД
    const allProducts = await Product.findAll();

    const recommendations: ProductRecommendation[] = [];

    for (const product of allProducts) {
      let score = 0;
      const reasons: string[] = [];

      // 1. Проверка типа кожи (обязательное совпадение)
      if (product.skinType.includes(skinType)) {
        score += 10;
        reasons.push(`Подходит для ${this.getSkinTypeName(skinType)} кожи`);
      } else {
        continue; // Пропускаем товар, если не подходит тип кожи
      }

      // 2. Проверка проблем (чем больше совпадений, тем выше приоритет)
      const matchedProblems = product.problems.filter(p => problems.includes(p));
      if (matchedProblems.length > 0) {
        score += matchedProblems.length * 5;
        reasons.push(`Решает проблемы: ${matchedProblems.map(p => this.getProblemName(p)).join(', ')}`);
      }

      // 3. Проверка цели ухода
      if (product.goal.includes(goal)) {
        score += 15;
        reasons.push(`Соответствует цели: ${this.getGoalName(goal)}`);
      }

      // 4. Бонус за категорию (если цель — очищение, приоритет cleanser)
      if (goal === 'cleansing' && product.category === 'cleanser') {
        score += 5;
      }
      if (goal === 'hydration' && product.category === 'moisturizer') {
        score += 5;
      }
      if (goal === 'anti-aging' && product.category === 'serum') {
        score += 5;
      }

      if (score > 0) {
        recommendations.push({
          product,
          score,
          reason: reasons.join('. '),
        });
      }
    }

    // Сортируем по убыванию scores
    return recommendations.sort((a, b) => b.score - a.score);
  }

  // Вспомогательные методы для красивых названий
  private getSkinTypeName(skinType: string): string {
    const names: Record<string, string> = {
      oily: 'жирной',
      dry: 'сухой',
      normal: 'нормальной',
      combination: 'комбинированной',
    };
    return names[skinType] || skinType;
  }

  private getProblemName(problem: string): string {
    const names: Record<string, string> = {
      acne: 'акне',
      wrinkles: 'морщины',
      dryness: 'сухость',
      pigmentation: 'пигментация',
      sensitivity: 'чувствительность',
    };
    return names[problem] || problem;
  }

  private getGoalName(goal: string): string {
    const names: Record<string, string> = {
      hydration: 'увлажнение',
      'anti-aging': 'омоложение',
      cleansing: 'очищение',
      protection: 'защита',
    };
    return names[goal] || goal;
  }

  /**
   * Формирует полную рутину ухода
   */
  async getFullRoutine(answers: QuizAnswers): Promise<{
    cleanser?: ProductRecommendation;
    toner?: ProductRecommendation;
    serum?: ProductRecommendation;
    moisturizer?: ProductRecommendation;
    sunscreen?: ProductRecommendation;
  }> {
    const recommendations = await this.getRecommendations(answers);

    const routine: any = {};

    // Берём по одному лучшему товару из каждой категории
    const categories = ['cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen'];
    
    for (const category of categories) {
      const product = recommendations.find(r => r.product.category === category);
      if (product) {
        routine[category] = product;
      }
    }

    return routine;
  }
}