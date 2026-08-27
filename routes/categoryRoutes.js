import express from 'express';
import {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategoryById,
  handleUpdateCategory,
  handleDeleteCategory,
} from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', handleCreateCategory);
router.get('/', handleGetCategories);
router.get('/:id', handleGetCategoryById);
router.put('/:id', handleUpdateCategory);
router.delete('/:id', handleDeleteCategory);

export default router;