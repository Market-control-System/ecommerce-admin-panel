// роуты по авторизации и другое с пользователями
import { Router } from 'express';
import tokenUtil from '../utils/tokenGenerator.js';
import authController from '../controllers/authController.js';
import passwordWork from '../utils/passwordWork.js';

const router = Router();

router.post('/login', authController.login);
router.get('/my-info', tokenUtil.verifyToken, authController.readMyInfo);

router.get('/ps/:pas', async (req, res) => {
    const { pas } = req.params; 
    console.log(await passwordWork.generatePasswordHash(pas)); 
    res.send('Проверьте консоль сервера для результата'); // Отправка ответа клиенту
});

export default router;