# 📚 Database Models Documentation

## 📊 Models Overview

### 1️⃣ User Model
```javascript
{
  userId: string,              // Unique identifier
  username: string,            // Display name
  email: string,              // Email address
  avatar: string,             // Avatar URL
  level: number,              // User level (1-100)
  experience: number,         // Total experience points
  coins: number,              // Current coins
  gems: number,               // Premium currency
  badges: [string],           // Earned badges
  vip_level: number,          // VIP tier (0-5)
  total_gifts_sent: number,   // Lifetime gifts sent
  total_gifts_received: number, // Lifetime gifts received
  total_games_played: number, // Total games played
  games_won: number,          // Games won
  followers: [string],        // List of followers
  following: [string],        // List of following
  created_at: Date,           // Account creation date
  updated_at: Date            // Last update date
}
```

### 2️⃣ Wallet Model
```javascript
{
  userId: string,             // User ID (unique)
  coins: number,              // Current coins balance
  gems: number,               // Current gems balance
  total_spent: number,        // Total coins spent
  total_earned: number,       // Total coins earned
  transaction_history: [
    {
      type: string,           // 'add' or 'deduct'
      amount: number,         // Transaction amount
      reason: string,         // Transaction reason
      timestamp: Date         // Transaction time
    }
  ],
  created_at: Date,           // Wallet creation date
  updated_at: Date            // Last update date
}
```

### 3️⃣ GiftTransaction Model
```javascript
{
  transactionId: string,      // Unique transaction ID
  senderId: string,           // Sender user ID
  receiverId: string,         // Receiver user ID
  giftId: string,             // Gift ID
  giftName: string,           // Gift name
  amount: number,             // Quantity sent
  cost: number,               // Total cost in coins
  currency: string,           // 'coins' or 'gems'
  timestamp: Date,            // Transaction time
  room_id: string,            // Room where sent
  message: string             // Optional message
}
```

### 4️⃣ GameResult Model
```javascript
{
  gameResultId: string,       // Unique result ID
  userId: string,             // Player user ID
  gameId: string,             // Game ID
  gameName: string,           // Game name
  betAmount: number,          // Bet amount
  winAmount: number,          // Win amount
  result: object,             // Game result data
  isWinner: boolean,          // Win/loss status
  timestamp: Date,            // Game play time
  room_id: string             // Room where played
}
```

### 5️⃣ Room Model
```javascript
{
  roomId: string,             // Unique room ID
  roomName: string,           // Room name
  owner: string,              // Owner user ID
  description: string,        // Room description
  members: [string],          // Member user IDs
  max_members: number,        // Maximum capacity
  is_private: boolean,        // Privacy setting
  password: string,           // Room password (if private)
  is_active: boolean,         // Active status
  background: string,         // Background image URL
  theme: string,              // 'light', 'dark', 'custom'
  created_at: Date,           // Room creation date
  updated_at: Date            // Last update date
}
```

---

## 🔗 Relationships

```
User (1) -------- (1) Wallet
  |
  |-------- (many) GiftTransaction (as sender)
  |-------- (many) GiftTransaction (as receiver)
  |-------- (many) GameResult
  |-------- (many) Room

Room (1) -------- (many) GiftTransaction
Room (1) -------- (many) GameResult
```

---

## 📡 API Usage Examples

### Create User
```bash
POST /api/users
{
  "username": "ahmed123",
  "email": "ahmed@example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Get User
```bash
GET /api/users/:userId
```

### Add Coins
```bash
POST /api/users/:userId/wallet/add-coins
{
  "amount": 100
}
```

### Deduct Coins
```bash
POST /api/users/:userId/wallet/deduct-coins
{
  "amount": 50,
  "reason": "Gift purchase"
}
```

### Get Transaction History
```bash
GET /api/users/:userId/wallet/history?limit=50
```

### Create Room
```bash
POST /api/rooms
{
  "roomName": "Gaming Room",
  "owner": "user123",
  "description": "For gaming and fun",
  "max_members": 50
}
```

### Get All Rooms
```bash
GET /api/rooms
```

---

## 🔐 Indexes (For Performance)

```javascript
// User
db.users.createIndex({ userId: 1 })          // Primary
db.users.createIndex({ email: 1 })           // Email lookup
db.users.createIndex({ created_at: -1 })    // Latest users

// Wallet
db.wallets.createIndex({ userId: 1 })       // Primary

// GiftTransaction
db.gifttransactions.createIndex({ senderId: 1, timestamp: -1 })
db.gifttransactions.createIndex({ receiverId: 1, timestamp: -1 })
db.gifttransactions.createIndex({ room_id: 1, timestamp: -1 })

// GameResult
db.gameresults.createIndex({ userId: 1, timestamp: -1 })
db.gameresults.createIndex({ room_id: 1, timestamp: -1 })

// Room
db.rooms.createIndex({ roomId: 1 })          // Primary
db.rooms.createIndex({ owner: 1 })           // Owner lookup
db.rooms.createIndex({ is_active: 1 })      // Active rooms
```

---

## 💾 MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB
mongodb-community-server

# Start MongoDB
mongod

# Connect to database
mongo
```

### MongoDB Atlas (Cloud)
```
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to .env:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/voice-chat-animations
```

---

## 📊 Aggregation Examples

### Top Senders
```javascript
db.gifttransactions.aggregate([
  { $group: { _id: "$senderId", totalSent: { $sum: "$cost" } } },
  { $sort: { totalSent: -1 } },
  { $limit: 10 }
])
```

### User Statistics
```javascript
db.users.aggregate([
  { $match: { created_at: { $gte: new Date("2026-05-01") } } },
  { $group: {
    _id: null,
    totalUsers: { $sum: 1 },
    avgLevel: { $avg: "$level" },
    totalCoins: { $sum: "$coins" }
  }}
])
```

### Game Statistics
```javascript
db.gameresults.aggregate([
  { $group: {
    _id: "$gameId",
    timesPlayed: { $sum: 1 },
    timesWon: { $sum: { $cond: ["$isWinner", 1, 0] } },
    totalBet: { $sum: "$betAmount" },
    totalWon: { $sum: "$winAmount" }
  }},
  { $sort: { timesPlayed: -1 } }
])
```
