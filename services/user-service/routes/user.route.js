import express from 'express';
import { register, login, logout, getUser, updateUser } from '../controllers/user.controller.js';
import { userAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/user', userAuth, getUser);

router.put('/user', userAuth, updateUser);

export default router;