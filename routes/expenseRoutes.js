import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  createExpenseHandler, getAllExpensesHandler, getExpenseByIdHandler,
  updateExpenseHandler, deleteExpenseHandler,
  filterByDateHandler, filterByCategoryHandler,
} from '../controllers/expenseController.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createExpenseHandler);
router.get('/filter/date', filterByDateHandler);
router.get('/filter/category', filterByCategoryHandler);
router.get('/:id', getExpenseByIdHandler);
router.get('/', getAllExpensesHandler);
router.put('/:id', updateExpenseHandler);
router.delete('/:id', deleteExpenseHandler);

export default router;