import express from 'express';
import { getAllGifts, getGiftById, getFormats } from '../controllers/giftController.js';

const router = express.Router();

// Get all gifts
router.get('/', getAllGifts);

// Get specific gift by ID
router.get('/:id', getGiftById);

// Get supported formats
router.get('/formats', getFormats);

export default router;
