import express from 'express';
import { getAllFrames, getFrameById, getFormats } from '../controllers/animationController.js';

const router = express.Router();

// Get all animation frames
router.get('/frames', getAllFrames);

// Get specific frame by ID
router.get('/frames/:id', getFrameById);

// Get supported formats
router.get('/formats', getFormats);

export default router;
