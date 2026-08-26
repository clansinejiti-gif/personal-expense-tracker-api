

import express from 'express';
import {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategoryById,
  handleUpdateCategory,
  handleDeleteCategory,
} from '../controllers/categoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// All category routes require a logged-in user
router.use(authMiddleware);

router.post('/', handleCreateCategory);
router.get('/', handleGetCategories);
router.get('/:id', handleGetCategoryById);
router.put('/:id', handleUpdateCategory);
router.delete('/:id', handleDeleteCategory);

export default router;
