import {Router} from 'express';
import UserController from '../controllers/user.controller';
import authMiddleware from '../middleware.ts/auth.middleware';
const router = Router();

router.post('/create', authMiddleware, UserController.create);

export default router;