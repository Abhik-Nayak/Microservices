import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController';
import authMiddleware  from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
// router.use(authMiddleware); // All routes here require authentication
router.get('/me',authMiddleware, getMe);

export default router;
