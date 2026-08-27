import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { registerRules, loginRules, validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registerRules, validate, register);
router.post('/login',    loginRules, validate, login);

// example protected route, this routes tries to give an understanding onhow to use the auth middleware. 
router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user });
});

export default router;