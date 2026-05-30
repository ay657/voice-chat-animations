import express from 'express';
import { getAllGifts, getGiftById, getGiftsByCategory, getFormats } from '../controllers/giftController.js';

const router = express.Router();

// Get all gifts with optional filters
router.get('/', getAllGifts);

// Get specific gift by ID
router.get('/:id', getGiftById);

// Get gifts by category
router.get('/category/:category', getGiftsByCategory);

// Get supported formats
router.get('/formats', getFormats);

export default router;
