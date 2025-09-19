import express from 'express';
import { register, login, logout, getUser, updateUser, refresh, devPurge, toggleAvailability } from '../controllers/captain.controller.js';
import { userAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/refresh', refresh);

router.delete('/dev/purge', devPurge);

router.get('/user', userAuth, getUser);

router.put('/user', userAuth, updateUser);

router.patch('/toggle-availability', userAuth, toggleAvailability);

export default router;