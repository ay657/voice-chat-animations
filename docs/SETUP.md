# 🎯 Installation & Setup Guide

## 📋 Prerequisites

- Node.js 14+ installed
- MongoDB installed or MongoDB Atlas account
- npm or yarn package manager

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/ay657/voice-chat-animations.git
cd voice-chat-animations
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/voice-chat-animations
```

### 4. Setup Database

#### Option A: Local MongoDB
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run directly
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/voice-chat-animations
```

### 5. Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 6. Verify Installation
Open browser and go to:
```
http://localhost:3000
```

You should see:
```json
{
  "message": "Voice Chat Animations & Games Library API",
  "version": "2.0.0",
  "features": [...],
  "websocket": { "enabled": true, ... }
}
```

---

## 🧪 Testing API

### 1. Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ahmed123",
    "email": "ahmed@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

### 2. Get User
```bash
curl http://localhost:3000/api/users/USER_ID
```

### 3. Create Room
```bash
curl -X POST http://localhost:3000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "roomName": "Gaming Room",
    "owner": "USER_ID",
    "description": "For gaming and fun",
    "max_members": 50
  }'
```

### 4. Get All Games
```bash
curl "http://localhost:3000/api/games?type=spin"
```

### 5. Get Gifts
```bash
curl "http://localhost:3000/api/gifts?category=romantic"
```

---

## 🔌 WebSocket Testing

### Using Socket.IO Client

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
  
  // Join room
  socket.emit('join-room', {
    roomId: 'room123',
    userId: 'user123',
    username: 'Ahmed',
    avatar: 'https://example.com/avatar.jpg'
  });
});

socket.on('user-joined', (data) => {
  console.log(`${data.username} joined!`);
});

// Send gift
socket.emit('send-gift', {
  roomId: 'room123',
  giftId: 'gift-001',
  giftName: 'Rose Gift',
  senderId: 'user123',
  receiverId: 'user456',
  amount: 1
});

socket.on('gift-received', (data) => {
  console.log('Gift received:', data);
});
```

---

## 📁 Project Structure

```
voice-chat-animations/
├── src/
│   ├── server.js              # Main server file
│   ├── index.js               # Entry point
│   ├── models/                # MongoDB schemas
│   │   ├── User.js
│   │   ├── Wallet.js
│   │   ├── GiftTransaction.js
│   │   ├── GameResult.js
│   │   └── Room.js
│   ├── controllers/           # Business logic
│   │   ├── animationController.js
│   │   ├── giftController.js
│   │   ├── effectController.js
│   │   ├── gameController.js
│   │   └── userController.js
│   ├── routes/               # API routes
│   │   ├── animations.js
│   │   ├── gifts.js
│   │   ├── effects.js
│   │   ├── games.js
│   │   ├── users.js
│   │   └── rooms.js
│   ├── db/                   # Database config
│   │   └── mongodb.js
│   ├── websocket/            # WebSocket handlers
│   │   └── socketHandler.js
│   └── utils/                # Utilities
│       └── fileHandler.js
├── assets/                   # Static assets
│   ├── frames/
│   ├── gifts/
│   └── effects/
├── docs/                     # Documentation
│   ├── API.md
│   ├── GAMES.md
│   ├── DATABASE.md
│   ├── WEBSOCKET.md
│   ├── ARCHITECTURE.md
│   └── SETUP.md
├── .env                      # Environment variables
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection failed: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running
```bash
# Check if MongoDB is running
mongosh

# If not running, start it
mongod
```

### Port Already in Use
```
❌ Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change port in `.env`
```
PORT=3001
```

### Module Not Found
```
❌ Error: Cannot find module 'socket.io'
```
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

### WebSocket Connection Failed
```
❌ WebSocket connection failed
```
**Solution:** Make sure WebSocket is enabled in server logs
- Check firewall settings
- Verify client-side socket.io is connected to correct URL

---

## 📊 Database Setup

### Create Indexes
```javascript
// Connect to MongoDB
mongo

// Select database
use voice-chat-animations

// Create indexes
db.users.createIndex({ userId: 1 })
db.users.createIndex({ email: 1 })
db.wallets.createIndex({ userId: 1 })
db.gifttransactions.createIndex({ senderId: 1, timestamp: -1 })
db.gameresults.createIndex({ userId: 1, timestamp: -1 })
db.rooms.createIndex({ roomId: 1 })
db.rooms.createIndex({ is_active: 1 })
```

---

## 🚀 Deployment

### Deploy to Heroku
```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Create app
heroku create voice-chat-animations

# Add MongoDB Atlas
heroku config:set MONGODB_URI=mongodb+srv://...

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t voice-chat-animations .
docker run -p 3000:3000 voice-chat-animations
```

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB installed/configured
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created
- [ ] MongoDB connection verified
- [ ] Server starts without errors
- [ ] API endpoints respond
- [ ] WebSocket connects
- [ ] Test user creation
- [ ] Test gift sending
- [ ] Test game play

---

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review GitHub issues
3. Contact support: ay657@example.com

---

**Happy coding! 🎉**
