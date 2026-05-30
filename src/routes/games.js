import express from 'express';
import { getAllGames, getGameById, getGamesByType, playGame } from '../controllers/gameController.js';

const router = express.Router();

// Get all games with optional filters
router.get('/', getAllGames);

// Get specific game by ID
router.get('/:id', getGameById);

// Get games by type
router.get('/type/:type', getGamesByType);

// Play a game
router.post('/:id/play', playGame);

export default router;
