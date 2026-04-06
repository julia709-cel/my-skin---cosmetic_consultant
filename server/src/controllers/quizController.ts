import { Request, Response } from 'express';
import { QuizService, QuizAnswers } from '../services/quizService';
import { validationResult } from 'express-validator';
import QuizResult from '../models/QuizResult';
import { AuthRequest } from '../middleware/auth';

const quizService = new QuizService();

// Получение рекомендаций
export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const answers: QuizAnswers = req.body;

    const recommendations = await quizService.getRecommendations(answers);

    // Сохраняем результат квиза (если пользователь авторизован)
    if ((req as AuthRequest).user) {
      await QuizResult.create({
        userId: (req as AuthRequest).user!.id,
        skinType: answers.skinType,
        problems: answers.problems,
        goal: answers.goal,
        recommendations: recommendations.map(r => ({
          productId: r.product.id,
          score: r.score,
          reason: r.reason,
        })),
      });
    }

    res.json({
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Получение полной рутины
export const getFullRoutine = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const answers: QuizAnswers = req.body;

    const routine = await quizService.getFullRoutine(answers);

    res.json({ routine });
  } catch (error) {
    console.error('Routine error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Получение истории квизов (для авторизованных пользователей)
export const getQuizHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    
    if (!authReq.user) {
      res.status(401).json({ error: 'Authorization required' });
      return;
    }

    const history = await QuizResult.findAll({
      where: { userId: authReq.user.id },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    res.json({ history });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};