// роуты полчени. данных для плагинов - курс USD / стоимость склада
import { Router } from 'express';
import tokenUtil from '../utils/tokenGenerator.js';
import checkRole from '../utils/checkRole.js';
import kursUSDController from '../controllers/pluginControllers/kursUSDController.js';

const router = Router();

router.get('/get-kurs', tokenUtil.verifyToken, checkRole(9), kursUSDController.getKurs);
router.get('/storage-cost', tokenUtil.verifyToken, checkRole(2), );

export default router;