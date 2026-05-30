import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 },
  gems: { type: Number, default: 0 },
  total_spent: { type: Number, default: 0 },
  total_earned: { type: Number, default: 0 },
  transaction_history: [
    {
      type: String,
      amount: Number,
      reason: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Wallet', walletSchema);
