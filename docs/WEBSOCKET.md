# 🔌 WebSocket Events Documentation

## 📡 Connection

```javascript
const socket = io('http://localhost:3000');
```

---

## 🚪 Room Events

### Join Room
**Client sends:**
```javascript
socket.emit('join-room', {
  roomId: 'room123',
  userId: 'user123',
  username: 'Ahmed',
  avatar: 'https://example.com/avatar.jpg'
});
```

**Server broadcasts:**
```javascript
socket.on('user-joined', (data) => {
  // {
  //   userId: 'user123',
  //   username: 'Ahmed',
  //   avatar: 'url',
  //   totalUsers: 5,
  //   timestamp: Date
  // }
});
```

### Leave Room
**Client sends:**
```javascript
socket.emit('leave-room', {
  roomId: 'room123',
  userId: 'user123'
});
```

**Server broadcasts:**
```javascript
socket.on('user-left', (data) => {
  // {
  //   userId: 'user123',
  //   username: 'Ahmed',
  //   timestamp: Date
  // }
});
```

---

## 🎁 Gift Events

### Send Gift
**Client sends:**
```javascript
socket.emit('send-gift', {
  roomId: 'room123',
  giftId: 'gift-001',
  giftName: 'Rose Gift',
  senderId: 'user123',
  receiverId: 'user456',
  amount: 1
});
```

**Success - Server broadcasts:**
```javascript
socket.on('gift-received', (data) => {
  // {
  //   transactionId: 'trans123',
  //   giftId: 'gift-001',
  //   giftName: 'Rose Gift',
  //   senderId: 'user123',
  //   receiverId: 'user456',
  //   amount: 1,
  //   cost: 10,
  //   animation_url: '/gifts/mp4/gift-001.mp4',
  //   timestamp: Date
  // }
});
```

**Sender receives confirmation:**
```javascript
socket.on('gift-sent', (data) => {
  // {
  //   success: true,
  //   transactionId: 'trans123',
  //   coinsDeducted: 10,
  //   message: 'Gift sent successfully! Rose Gift'
  // }
});
```

**Error handling:**
```javascript
socket.on('gift-error', (data) => {
  // {
  //   error: 'Insufficient coins',
  //   required: 10,
  //   available: 5
  // }
});
```

---

## 🎮 Game Events

### Play Game
**Client sends:**
```javascript
socket.emit('play-game', {
  roomId: 'room123',
  gameId: 'game-spin-001',
  gameName: 'Lucky Spin',
  userId: 'user123',
  betAmount: 10
});
```

**Success - Server broadcasts:**
```javascript
socket.on('game-result', (data) => {
  // {
  //   gameResultId: 'result123',
  //   userId: 'user123',
  //   gameName: 'Lucky Spin',
  //   betAmount: 10,
  //   winAmount: 20,
  //   isWinner: true,
  //   timestamp: Date
  // }
});
```

**Error handling:**
```javascript
socket.on('game-error', (data) => {
  // {
  //   error: 'Insufficient coins'
  // }
});
```

---

## 💻 Complete Client Example

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// Connect to room
function joinRoom(roomId, userId, username) {
  socket.emit('join-room', {
    roomId,
    userId,
    username,
    avatar: 'https://example.com/avatar.jpg'
  });
}

// Listen for users joining
socket.on('user-joined', (data) => {
  console.log(`${data.username} joined! Total users: ${data.totalUsers}`);
});

// Send a gift
function sendGift(roomId, giftId, giftName, receiverId) {
  socket.emit('send-gift', {
    roomId,
    giftId,
    giftName,
    senderId: 'my-user-id',
    receiverId,
    amount: 1
  });
}

// Listen for gifts
socket.on('gift-received', (data) => {
  console.log(`${data.giftName} received!`);
  console.log(`Animation: ${data.animation_url}`);
});

// Play a game
function playGame(roomId, gameId, gameName, betAmount) {
  socket.emit('play-game', {
    roomId,
    gameId,
    gameName,
    userId: 'my-user-id',
    betAmount
  });
}

// Listen for game results
socket.on('game-result', (data) => {
  if (data.isWinner) {
    console.log(`🎉 You won ${data.winAmount} coins!`);
  } else {
    console.log(`💔 You lost ${data.betAmount} coins`);
  }
});

// Leave room
function leaveRoom(roomId, userId) {
  socket.emit('leave-room', { roomId, userId });
}

// Listen for users leaving
socket.on('user-left', (data) => {
  console.log(`${data.username} left the room`);
});

// Error handling
socket.on('gift-error', (error) => {
  console.error('Gift error:', error.error);
});

socket.on('game-error', (error) => {
  console.error('Game error:', error.error);
});

// Disconnect
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

---

## 📊 Event Flow Diagrams

### Gift Transaction Flow
```
Client A                    Server                    Client B
  |
  |-- send-gift ------------>|
  |                          |
  |                          |-- Check wallet
  |                          |-- Deduct coins from A
  |                          |-- Add coins to B
  |                          |-- Save transaction
  |                          |
  |<--------- gift-sent ------|-- gift-received ----->|
  |                          |
  |<---- gift-received ------|-- gift-received ----->|
  |                          |-- gift-received ----->|
  |                          (all users in room)
```

### Game Play Flow
```
Client A                    Server                    Other Clients
  |
  |-- play-game ------------->|
  |                          |
  |                          |-- Check wallet
  |                          |-- Deduct bet
  |                          |-- Simulate game
  |                          |-- Calculate result
  |                          |-- Update wallet
  |                          |-- Save result
  |                          |
  |<--------- game-result ----|-- game-result ------>|
  |                          |
```

---

## 🔐 Security Considerations

1. **Authentication**: Add JWT tokens for socket connections
2. **Validation**: Validate all incoming data
3. **Rate Limiting**: Limit events per user per minute
4. **Encryption**: Use SSL/TLS for socket connections
5. **Sanitization**: Sanitize all user inputs

---

## 📈 Performance Tips

1. Use rooms to limit broadcast scope
2. Implement pagination for history
3. Cache frequently accessed data
4. Use connection pooling for database
5. Monitor socket connections and memory usage
