import {
  createExpense, getAllExpenses, getExpenseById,
  updateExpense, deleteExpense,
  filterExpensesByDate, filterExpensesByCategory,
} from '../models/expenseModel.js';

export const createExpenseHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category_id, amount, description, date } = req.body;

    if (!category_id || !amount) {
      return res.status(400).json({ message: 'category_id and amount are required' });
    }

    const expense = await createExpense(userId, category_id, amount, description, date);
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAllExpensesHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await getAllExpenses(userId);
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getExpenseByIdHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const expense = await getExpenseById(id, userId);

    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateExpenseHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { category_id, amount, description, date } = req.body;

    if (!category_id || !amount) {
      return res.status(400).json({ message: 'category_id and amount are required' });
    }

    const updated = await updateExpense(id, userId, category_id, amount, description, date);
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteExpenseHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await deleteExpense(id, userId);

    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const filterByDateHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' });
    }

    const expenses = await filterExpensesByDate(userId, startDate, endDate);
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const filterByCategoryHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ message: 'categoryId is required' });
    }

    const expenses = await filterExpensesByCategory(userId, categoryId);
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};