import express from 'express';
import { getAllEffects, getEffectsByType, getEffectAsset } from '../controllers/effectController.js';

const router = express.Router();

// Get all effects
router.get('/', getAllEffects);

// Get effects by type
router.get('/:type', getEffectsByType);

// Get specific effect asset
router.get('/:type/:id/asset', getEffectAsset);

export default router;
