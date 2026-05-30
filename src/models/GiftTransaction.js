import mongoose from 'mongoose';

const giftTransactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  giftId: { type: String, required: true },
  giftName: String,
  amount: { type: Number, default: 1 },
  cost: Number,
  currency: { type: String, enum: ['coins', 'gems'], default: 'coins' },
  timestamp: { type: Date, default: Date.now },
  room_id: String,
  message: String
});

export default mongoose.model('GiftTransaction', giftTransactionSchema);
