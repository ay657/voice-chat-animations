// User Controller
import User from '../models/User.js';
import Wallet from '../models/Wallet.js';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (req, res) => {
  try {
    const { username, email, avatar } = req.body;
    
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        error: 'Username and email are required'
      });
    }

    const userId = uuidv4();
    const user = new User({
      userId,
      username,
      email,
      avatar
    });

    const wallet = new Wallet({
      userId,
      coins: 1000, // Starting coins
      gems: 50 // Starting gems
    });

    await user.save();
    await wallet.save();

    res.json({
      success: true,
      message: 'User created successfully',
      user: { ...user.toObject(), wallet }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    const wallet = await Wallet.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      user: { ...user.toObject(), wallet }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const user = await User.findOneAndUpdate(
      { userId },
      { ...updates, updated_at: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addCoins = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount'
      });
    }

    const wallet = await Wallet.findOneAndUpdate(
      { userId },
      {
        $inc: { coins: amount, total_earned: amount },
        $push: {
          transaction_history: {
            type: 'add',
            amount,
            reason: 'Manual addition',
            timestamp: new Date()
          }
        },
        updated_at: new Date()
      },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      });
    }

    res.json({
      success: true,
      message: 'Coins added successfully',
      wallet
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deductCoins = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, reason } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount'
      });
    }

    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      });
    }

    if (wallet.coins < amount) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient coins'
      });
    }

    const updatedWallet = await Wallet.findOneAndUpdate(
      { userId },
      {
        $inc: { coins: -amount, total_spent: amount },
        $push: {
          transaction_history: {
            type: 'deduct',
            amount,
            reason: reason || 'Purchase',
            timestamp: new Date()
          }
        },
        updated_at: new Date()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Coins deducted successfully',
      wallet: updatedWallet
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getWallet = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      });
    }

    res.json({
      success: true,
      wallet
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50 } = req.query;

    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      });
    }

    const history = wallet.transaction_history.slice(-limit);

    res.json({
      success: true,
      total: wallet.transaction_history.length,
      transactions: history
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
