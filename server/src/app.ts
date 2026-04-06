import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import quizRoutes from './routes/quiz';
import Order from './models/Order';
import OrderItem from './models/OrderItem';
import User from './models/User';
import Product from './models/Product';
import orderRoutes from './routes/orderRoutes';

// Настройка связей
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check для Render
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// CORS настройка
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/orders', orderRoutes);

// Database sync and server start
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: process.env.NODE_ENV === 'development' })
  .then(() => {
    console.log('✅ Database synchronized');
    app.listen(PORT, () => {
      console.log(`🚀 MotionMood API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database sync error:', err);
  });

export default app;