import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import animationRoutes from './routes/animations.js';
import giftRoutes from './routes/gifts.js';
import effectRoutes from './routes/effects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('assets'));

// Routes
app.use('/api/animations', animationRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/effects', effectRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Voice Chat Animations Library API',
    version: '1.0.0',
    endpoints: {
      animations: '/api/animations',
      gifts: '/api/gifts',
      effects: '/api/effects',
      health: '/health'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

app.listen(PORT, () => {
  console.log(`🚀 Voice Chat Animations Server running on http://localhost:${PORT}`);
  console.log(`🔌 API endpoints available at http://localhost:${PORT}/api`);
});

export default app;
