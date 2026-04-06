import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Product from '../models/Product';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Создание заказа
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Authorization required' });
      return;
    }

    const { items, shippingAddress, phone } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Order must contain at least one item' });
      return;
    }

    // Проверяем наличие товаров и считаем сумму
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        res.status(404).json({ error: `Product ${item.productId} not found` });
        return;
      }

      const price = parseFloat(product.price.toString());
      totalAmount += price * item.quantity;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: price,
      });
    }

    // Создаём заказ
    const order = await Order.create({
      userId: authReq.user.id,
      status: 'pending',
      totalAmount,
      shippingAddress,
      phone,
    });

    // Создаём позиции заказа
    await OrderItem.bulkCreate(
      orderItemsData.map(item => ({
        ...item,
        orderId: order.id,
      }))
    );

    // Получаем полный заказ с товарами
    const fullOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'imageUrl'],
            },
          ],
        },
      ],
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: fullOrder,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Получить все заказы пользователя
export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Authorization required' });
      return;
    }

    const orders = await Order.findAll({
      where: { userId: authReq.user.id },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'imageUrl', 'price'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Получить детали заказа
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Authorization required' });
      return;
    }

    const { id } = req.params;
    const order = await Order.findOne({
      where: { id, userId: authReq.user.id },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'description', 'imageUrl', 'price'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name'],
        },
      ],
    });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Обновить статус заказа (для админа)
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const order = await Order.findByPk(Number(id));
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    await order.update({ status });

    res.json({
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};