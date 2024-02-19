// роуты полчени. данных для плагинов - курс USD / стоимость склада
import { Router } from 'express';
import tokenUtil from '../utils/tokenGenerator.js';
import checkRole from '../utils/checkRole.js';
import xmlRozetkaControllers from '../controllers/xmlControllers/xmlRozetkaControllers.js';

const router = Router();

router.post('/get-product-rozetka', tokenUtil.verifyToken, checkRole(4), xmlRozetkaControllers.getProduct);

export default router;