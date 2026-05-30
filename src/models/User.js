import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: null },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  gems: { type: Number, default: 0 },
  badges: [{ type: String }],
  vip_level: { type: Number, default: 0 },
  total_gifts_sent: { type: Number, default: 0 },
  total_gifts_received: { type: Number, default: 0 },
  total_games_played: { type: Number, default: 0 },
  games_won: { type: Number, default: 0 },
  followers: [{ type: String }],
  following: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
