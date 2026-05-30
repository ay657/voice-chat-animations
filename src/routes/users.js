import express from 'express';
import {
  createUser,
  getUser,
  updateUser,
  addCoins,
  deductCoins,
  getWallet,
  getTransactionHistory
} from '../controllers/userController.js';

const router = express.Router();

// User routes
router.post('/', createUser);
router.get('/:userId', getUser);
router.put('/:userId', updateUser);

// Wallet routes
router.get('/:userId/wallet', getWallet);
router.post('/:userId/wallet/add-coins', addCoins);
router.post('/:userId/wallet/deduct-coins', deductCoins);
router.get('/:userId/wallet/history', getTransactionHistory);

export default router;
