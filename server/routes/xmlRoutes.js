// роуты полчени. данных для плагинов - курс USD / стоимость склада
import { Router } from 'express';
import tokenUtil from '../utils/tokenGenerator.js';
import checkRole from '../utils/checkRole.js';
import xmlRozetkaControllers from '../controllers/xmlControllers/xmlRozetkaControllers.js';
import xmlEpicentrController from '../controllers/xmlControllers/xmlEpicentrController.js';

const router = Router();

router.get('/get-product-rozetka', tokenUtil.verifyToken, checkRole(4), xmlRozetkaControllers.getProduct);
router.get('/get-cat-rozetka', tokenUtil.verifyToken, checkRole(4), xmlRozetkaControllers.getCat);
router.post('/update-xmlproduct-rozetka', tokenUtil.verifyToken, checkRole(4), xmlRozetkaControllers.addUpdateXmlRow);

router.get('/get-cat-epicentr', tokenUtil.verifyToken, checkRole(4), xmlEpicentrController.getCat);
router.get('/get-product-epicentr', tokenUtil.verifyToken, checkRole(4), xmlEpicentrController.getProduct);

router.get('/create-xml-rozetka', xmlRozetkaControllers.createXmlRozetka);
router.get('/create-xml-epicentr', xmlEpicentrController.createXmlEpicentr);

export default router;