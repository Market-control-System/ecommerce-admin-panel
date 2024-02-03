// роуты по авторизации и другое с пользователями
import { Router } from 'express';
import tokenUtil from '../utils/tokenGenerator.js';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/login', authController.login);
router.get('/my-info', tokenUtil.verifyToken, authController.readMyInfo);

export default router;