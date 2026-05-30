import express from 'express';
import { getAllFrames, getFrameById, getFramesByCategory, getFormats } from '../controllers/animationController.js';

const router = express.Router();

// Get all animation frames
router.get('/', getAllFrames);

// Get specific frame by ID
router.get('/:id', getFrameById);

// Get frames by category
router.get('/category/:category', getFramesByCategory);

// Get supported formats
router.get('/formats', getFormats);

export default router;
