import { Router } from 'express';
import { body } from 'express-validator';
import { getRecommendations, getFullRoutine, getQuizHistory } from '../controllers/quizController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

const quizValidation = [
  body('skinType')
    .isIn(['oily', 'dry', 'normal', 'combination'])
    .withMessage('Invalid skin type'),
  body('problems')
    .isArray({ min: 1 })
    .withMessage('Problems must be an array with at least one item'),
  body('problems.*')
    .isIn(['acne', 'wrinkles', 'dryness', 'pigmentation', 'sensitivity'])
    .withMessage('Invalid problem type'),
  body('goal')
    .isIn(['hydration', 'anti-aging', 'cleansing', 'protection'])
    .withMessage('Invalid goal'),
];

// ✅ Все роуты теперь с authMiddleware:
router.post('/recommend', authMiddleware, quizValidation, getRecommendations);
router.post('/routine', authMiddleware, quizValidation, getFullRoutine);
router.get('/history', authMiddleware, getQuizHistory);

export default router;