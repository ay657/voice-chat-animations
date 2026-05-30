import mongoose from 'mongoose';

const gameResultSchema = new mongoose.Schema({
  gameResultId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  gameId: { type: String, required: true },
  gameName: String,
  betAmount: Number,
  winAmount: { type: Number, default: 0 },
  result: mongoose.Schema.Types.Mixed,
  isWinner: Boolean,
  timestamp: { type: Date, default: Date.now },
  room_id: String
});

export default mongoose.model('GameResult', gameResultSchema);
