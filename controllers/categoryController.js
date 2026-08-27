
import {
  createCategory,
  getCategoriesByUser,
  getCategoryById,
  updateCategory,
  deleteCategory,
  categoryNameExists,
} from '../models/categoryModel.js';

// 
//  POST /categories
//  Create a new category for the logged-in user
//  
export async function handleCreateCategory(req, res) {
  try {
    const { name } = req.body;
    const userId = req.user.id; // set by authMiddleware

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const exists = await categoryNameExists(name.trim(), userId);
    if (exists) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const category = await createCategory({ name: name.trim(), userId });
    return res.status(201).json({ category });
  } catch (error) {
    console.error('Error creating category:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
}

// 
//   GET /categories
//   List all categories belonging to the logged-in user
//  
export async function handleGetCategories(req, res) {
  try {
    const userId = req.user.id;
    const categories = await getCategoriesByUser(userId);
    return res.status(200).json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
}

// /
//  GET /categories/:id
//  Get a single category by ID (must belong to logged-in user)
//  
export async function handleGetCategoryById(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const category = await getCategoryById(id, userId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.error('Error fetching category:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
}


//   PUT /categories/:id
//   Update a category's name
 
export async function handleUpdateCategory(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const updated = await updateCategory(id, userId, name.trim());
    if (!updated) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ category: updated });
  } catch (error) {
    console.error('Error updating category:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
}

// 
//   DELETE /categories/:id
//   Delete a category
//  
export async function handleDeleteCategory(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deleted = await deleteCategory(id, userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
}