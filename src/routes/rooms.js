import express from 'express';
import { getRoomInfo, getAllRooms } from '../websocket/socketHandler.js';
import Room from '../models/Room.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create room
router.post('/', async (req, res) => {
  try {
    const { roomName, owner, description, is_private, max_members } = req.body;
    const roomId = uuidv4();

    const room = new Room({
      roomId,
      roomName,
      owner,
      description,
      is_private: is_private || false,
      max_members: max_members || 100,
      members: [owner]
    });

    await room.save();

    res.json({
      success: true,
      message: 'Room created successfully',
      room
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({ is_active: true });
    const activeRooms = getAllRooms();

    const roomsWithActiveUsers = rooms.map(room => {
      const activeInfo = activeRooms.find(r => r.id === room.roomId);
      return {
        ...room.toObject(),
        active_users: activeInfo?.activeUsers.length || 0
      };
    });

    res.json({
      success: true,
      total: roomsWithActiveUsers.length,
      rooms: roomsWithActiveUsers
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get room details
router.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }

    const activeInfo = getRoomInfo(roomId);

    res.json({
      success: true,
      room: {
        ...room.toObject(),
        active_users: activeInfo?.activeUsers || [],
        total_active_users: activeInfo?.activeUsers.length || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update room
router.put('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const updates = req.body;

    const room = await Room.findOneAndUpdate(
      { roomId },
      { ...updates, updated_at: new Date() },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }

    res.json({
      success: true,
      message: 'Room updated successfully',
      room
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete room
router.delete('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOneAndUpdate(
      { roomId },
      { is_active: false, updated_at: new Date() },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }

    res.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
