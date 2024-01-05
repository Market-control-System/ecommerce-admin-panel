// роуты полчению списка товаров
import { Router } from 'express';
import tokenUtil from '../utils/tokenGenerator.js';
import productGetController from '../controllers/productGetController.js';

const router = Router();

router.post('/getAll', tokenUtil.verifyToken , productGetController.getAll);

export default router;