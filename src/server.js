import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import animationRoutes from './routes/animations.js';
import giftRoutes from './routes/gifts.js';
import effectRoutes from './routes/effects.js';
import gameRoutes from './routes/games.js';
import userRoutes from './routes/users.js';
import roomRoutes from './routes/rooms.js';
import { connectDB } from './db/mongodb.js';
import { initializeWebSocket } from './websocket/socketHandler.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.use(express.static('assets'));

// Connect Database
const dbConnected = await connectDB();

// Initialize WebSocket
const io = initializeWebSocket(httpServer);

// Routes
app.use('/api/animations', animationRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/effects', effectRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'Connected' : 'Disconnected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Voice Chat Animations & Games Library API',
    version: '2.0.0',
    description: 'Complete animation and interactive games library with WebSocket support',
    features: [
      'Animation Frames (PNG, WebP)',
      'Animated Gifts (MP4, Lottie)',
      'Entry Effects (SVG, PNG)',
      'Interactive Games (Spin, Dice, Cards, etc)',
      'User Management System',
      'Wallet & Currency System',
      'WebSocket Real-time Communication',
      'MongoDB Database Integration'
    ],
    endpoints: {
      animations: '/api/animations',
      gifts: '/api/gifts',
      effects: '/api/effects',
      games: '/api/games',
      users: '/api/users',
      rooms: '/api/rooms',
      health: '/health'
    },
    websocket: {
      enabled: true,
      events: [
        'join-room',
        'leave-room',
        'send-gift',
        'play-game',
        'user-joined',
        'user-left',
        'gift-received',
        'game-result'
      ]
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

httpServer.listen(PORT, () => {
  console.log(`\n🚀 Voice Chat Animations & Games Server`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`💻 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🔌 WebSocket enabled and ready`);
  console.log(`📊 Database: ${dbConnected ? '✅ Connected' : '❌ Disconnected'}`);
  console.log(`\n✨ Features: Animations | Gifts | Effects | Games | Users | Rooms | WebSocket\n`);
});

export default app;
