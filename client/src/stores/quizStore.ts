import { makeAutoObservable, runInAction } from 'mobx';
import { quizService, type QuizAnswers, type ProductRecommendation, type QuizHistory } from '../services/quizService';

class QuizStore {
  currentStep = 1;
  answers: QuizAnswers = {
    skinType: 'oily',
    problems: [],
    goal: 'hydration',
  };
  recommendations: ProductRecommendation[] = [];
  history: QuizHistory[] = [];
  isLoading = false;
  isComplete = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Переход к следующему шагу
  nextStep() {
    this.currentStep++;
  }

  // Переход к предыдущему шагу
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Установка типа кожи
  setSkinType(skinType: QuizAnswers['skinType']) {
    this.answers.skinType = skinType;
  }

  // Переключение проблемы
  toggleProblem(problem: string) {
    const index = this.answers.problems.indexOf(problem);
    if (index > -1) {
      this.answers.problems.splice(index, 1);
    } else {
      this.answers.problems.push(problem);
    }
  }

  // Установка цели
  setGoal(goal: QuizAnswers['goal']) {
    this.answers.goal = goal;
  }

  // Сброс квиза
  reset() {
    this.currentStep = 1;
    this.answers = {
      skinType: 'oily',
      problems: [],
      goal: 'hydration',
    };
    this.recommendations = [];
    this.isComplete = false;
    this.error = null;
  }

  // Отправка квиза
  async submitQuiz() {
    this.isLoading = true;
    this.error = null;

    try {
      const result = await quizService.getRecommendations(this.answers);
      runInAction(() => {
        this.recommendations = result.recommendations;
        this.isComplete = true;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.error || 'Ошибка получения рекомендаций';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Загрузка истории
  async loadHistory() {
    this.isLoading = true;
    try {
      const result = await quizService.getHistory();
      runInAction(() => {
        this.history = result.history;
      });
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const quizStore = new QuizStore();