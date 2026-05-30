import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  roomName: String,
  owner: String,
  description: String,
  members: [{ type: String }],
  max_members: { type: Number, default: 100 },
  is_private: { type: Boolean, default: false },
  password: String,
  is_active: { type: Boolean, default: true },
  background: String,
  theme: { type: String, enum: ['light', 'dark', 'custom'], default: 'dark' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Room', roomSchema);
