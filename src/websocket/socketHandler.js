import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import GiftTransaction from '../models/GiftTransaction.js';
import GameResult from '../models/GameResult.js';
import Wallet from '../models/Wallet.js';

const rooms = new Map();
const userSockets = new Map();

export const initializeWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Connection event
  io.on('connection', (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    // User joins room
    socket.on('join-room', async (data) => {
      const { roomId, userId, username, avatar } = data;
      socket.join(roomId);
      userSockets.set(socket.id, { userId, username, avatar, roomId });

      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          id: roomId,
          members: [],
          activeUsers: []
        });
      }

      const room = rooms.get(roomId);
      room.activeUsers.push({ socketId: socket.id, userId, username, avatar });

      // Broadcast user joined
      io.to(roomId).emit('user-joined', {
        userId,
        username,
        avatar,
        totalUsers: room.activeUsers.length,
        timestamp: new Date()
      });

      console.log(`👤 ${username} joined room ${roomId}`);
    });

    // Send gift event
    socket.on('send-gift', async (data) => {
      try {
        const { roomId, giftId, giftName, senderId, receiverId, amount = 1 } = data;
        const transactionId = uuidv4();
        const cost = amount * 10; // Example: 10 coins per gift

        // Check sender's wallet
        const senderWallet = await Wallet.findOne({ userId: senderId });
        if (!senderWallet || senderWallet.coins < cost) {
          socket.emit('gift-error', {
            error: 'Insufficient coins',
            required: cost,
            available: senderWallet?.coins || 0
          });
          return;
        }

        // Deduct coins from sender
        await Wallet.updateOne(
          { userId: senderId },
          {
            $inc: { coins: -cost, total_spent: cost },
            $push: {
              transaction_history: {
                type: 'deduct',
                amount: cost,
                reason: `Gift: ${giftName}`,
                timestamp: new Date()
              }
            }
          }
        );

        // Add coins to receiver (as tip)
        const tipAmount = Math.floor(cost * 0.8);
        await Wallet.updateOne(
          { userId: receiverId },
          {
            $inc: { coins: tipAmount, total_earned: tipAmount },
            $push: {
              transaction_history: {
                type: 'add',
                amount: tipAmount,
                reason: `Gift received: ${giftName}`,
                timestamp: new Date()
              }
            }
          }
        );

        // Save transaction
        const transaction = new GiftTransaction({
          transactionId,
          senderId,
          receiverId,
          giftId,
          giftName,
          amount,
          cost,
          currency: 'coins',
          room_id: roomId,
          timestamp: new Date()
        });
        await transaction.save();

        // Broadcast gift to room
        io.to(roomId).emit('gift-received', {
          transactionId,
          giftId,
          giftName,
          senderId,
          receiverId,
          amount,
          cost,
          animation_url: `/gifts/mp4/${giftId}.mp4`,
          timestamp: new Date()
        });

        // Send confirmation to sender
        socket.emit('gift-sent', {
          success: true,
          transactionId,
          coinsDeducted: cost,
          message: `Gift sent successfully! ${giftName}`
        });
      } catch (error) {
        socket.emit('gift-error', { error: error.message });
      }
    });

    // Play game event
    socket.on('play-game', async (data) => {
      try {
        const { roomId, gameId, gameName, userId, betAmount } = data;
        const gameResultId = uuidv4();

        // Check wallet
        const wallet = await Wallet.findOne({ userId });
        if (!wallet || wallet.coins < betAmount) {
          socket.emit('game-error', {
            error: 'Insufficient coins'
          });
          return;
        }

        // Deduct bet amount
        await Wallet.updateOne(
          { userId },
          {
            $inc: { coins: -betAmount, total_spent: betAmount },
            $push: {
              transaction_history: {
                type: 'deduct',
                amount: betAmount,
                reason: `Game bet: ${gameName}`,
                timestamp: new Date()
              }
            }
          }
        );

        // Simulate game result
        const isWinner = Math.random() < 0.5;
        const winAmount = isWinner ? betAmount * 2 : 0;

        // Add winnings if winner
        if (isWinner) {
          await Wallet.updateOne(
            { userId },
            {
              $inc: { coins: winAmount, total_earned: winAmount },
              $push: {
                transaction_history: {
                  type: 'add',
                  amount: winAmount,
                  reason: `Game win: ${gameName}`,
                  timestamp: new Date()
                }
              }
            }
          );
        }

        // Save result
        const result = new GameResult({
          gameResultId,
          userId,
          gameId,
          gameName,
          betAmount,
          winAmount,
          isWinner,
          room_id: roomId,
          timestamp: new Date()
        });
        await result.save();

        // Broadcast result to room
        io.to(roomId).emit('game-result', {
          gameResultId,
          userId,
          gameName,
          betAmount,
          winAmount,
          isWinner,
          timestamp: new Date()
        });
      } catch (error) {
        socket.emit('game-error', { error: error.message });
      }
    });

    // User leaves room
    socket.on('leave-room', (data) => {
      const { roomId, userId } = data;
      socket.leave(roomId);
      const userInfo = userSockets.get(socket.id);

      if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        room.activeUsers = room.activeUsers.filter(u => u.socketId !== socket.id);
      }

      io.to(roomId).emit('user-left', {
        userId,
        username: userInfo?.username,
        timestamp: new Date()
      });

      console.log(`👤 ${userInfo?.username} left room ${roomId}`);
    });

    // Disconnect
    socket.on('disconnect', () => {
      const userInfo = userSockets.get(socket.id);
      if (userInfo) {
        const { roomId } = userInfo;
        if (rooms.has(roomId)) {
          const room = rooms.get(roomId);
          room.activeUsers = room.activeUsers.filter(u => u.socketId !== socket.id);
        }
      }
      userSockets.delete(socket.id);
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getRoomInfo = (roomId) => {
  return rooms.get(roomId) || null;
};

export const getAllRooms = () => {
  return Array.from(rooms.values());
};
