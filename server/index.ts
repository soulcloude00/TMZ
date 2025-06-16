import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import Razorpay from 'razorpay';

const prisma = new PrismaClient();
const app = express();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxx',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'xxxxxxxxxxxxxxxx',
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.use(cors());
app.use(express.json());

// Get all stock items
app.get('/api/stock', async (req, res) => {
  try {
    console.log('Fetching all stock items...');
    const items = await prisma.stockItem.findMany();
    console.log('Found items:', items);
    res.json(items);
  } catch (error) {
    console.error('Error in GET /api/stock:', error);
    res.status(500).json({ error: 'Error fetching stock items', details: error });
  }
});

// Get a single stock item
app.get('/api/stock/:id', async (req, res) => {
  try {
    console.log('Fetching stock item with ID:', req.params.id);
    const item = await prisma.stockItem.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!item) {
      console.log('Item not found');
      return res.status(404).json({ error: 'Stock item not found' });
    }
    console.log('Found item:', item);
    res.json(item);
  } catch (error) {
    console.error('Error in GET /api/stock/:id:', error);
    res.status(500).json({ error: 'Error fetching stock item', details: error });
  }
});

// Create a new stock item
app.post('/api/stock', async (req, res) => {
  try {
    let data = { ...req.body };
    // Ensure images is an array
    if (typeof data.images === 'string') {
      try {
        data.images = JSON.parse(data.images);
      } catch {
        data.images = [data.images];
      }
    }
    if (!Array.isArray(data.images)) {
      data.images = data.image ? [data.image] : [];
    }
    const { name, brand, price, os, features, image, images, rating, reviews, inStock, stockCount, isNew, isHot, type } = data;

    // Explicitly ensure rating is a number
    const numericRating = parseFloat(rating);
    const finalRating = isNaN(numericRating) ? 0 : numericRating;

    const item = await prisma.stockItem.create({
      data: {
        name,
        brand,
        price,
        os,
        features,
        image,
        images,
        rating: finalRating, // Use the explicitly casted rating
        reviews,
        inStock,
        stockCount,
        isNew,
        isHot,
        type,
      },
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error in POST /api/stock:', error);
    res.status(500).json({ error: 'Error creating stock item', details: error });
  }
});

// Update a stock item
app.put('/api/stock/:id', async (req, res) => {
  try {
    let data = { ...req.body };
    // Ensure images is an array
    if (typeof data.images === 'string') {
      try {
        data.images = JSON.parse(data.images);
      } catch {
        data.images = [data.images];
      }
    }
    if (!Array.isArray(data.images)) {
      data.images = data.image ? [data.image] : [];
    }
    const item = await prisma.stockItem.update({
      where: { id: Number(req.params.id) },
      data,
    });
    res.json(item);
  } catch (error) {
    console.error('Error in PUT /api/stock/:id:', error);
    res.status(500).json({ error: 'Error updating stock item', details: error });
  }
});

// Delete a stock item
app.delete('/api/stock/:id', async (req, res) => {
  try {
    console.log('Deleting stock item:', req.params.id);
    await prisma.stockItem.delete({
      where: { id: Number(req.params.id) },
    });
    console.log('Item deleted successfully');
    res.status(204).end();
  } catch (error) {
    console.error('Error in DELETE /api/stock/:id:', error);
    res.status(500).json({ error: 'Error deleting stock item', details: error });
  }
});

// Admin login route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.adminUser.findUnique({ where: { username } });
    if (user && user.password === password) { // In production, use bcrypt!
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// User sign up
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed }
    });
    res.status(201).json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error signing up', details: error.message });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', details: error.message });
  }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, total, address, payment } = req.body;
    const userId = req.body.userId; // Get from auth middleware in production

    // Create order with address and payment
    const order = await prisma.order.create({
      data: {
        userId,
        items,
        total,
        address: {
          create: {
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country || 'India'
          }
        },
        payment: {
          create: {
            amount: total,
            method: payment.method,
            cardLast4: payment.cardNumber.slice(-4),
            status: 'pending'
          }
        }
      },
      include: {
        address: true,
        payment: true
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order', details: error });
  }
});

// Get orders for a user
app.get('/api/orders', async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }

    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: {
        address: true,
        payment: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    res.status(500).json({ error: 'Error fetching orders', details: error.message });
  }
});

// Get a single order
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        address: true,
        payment: true
      }
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order', details: error });
  }
});

// Update order status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status },
      include: {
        address: true,
        payment: true
      }
    });
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Error updating order status', details: error });
  }
});

// Update payment status
app.patch('/api/payments/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await prisma.payment.update({
      where: { id: Number(req.params.id) },
      data: { status }
    });
    res.json(payment);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Error updating payment status', details: error });
  }
});

// Razorpay order creation endpoint
app.post('/api/razorpay/order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    });
    res.json(order);
  } catch (err) {
    console.error('Razorpay order creation failed:', err);
    res.status(500).json({ error: 'Razorpay order creation failed' });
  }
});

const PORT = process.env.PORT || 3001;

// Add error handling for the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Server error:', error);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  server.close(() => {
    process.exit(1);
  });
}); 