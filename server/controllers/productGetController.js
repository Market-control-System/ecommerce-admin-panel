import { executeQuery } from '../utils/dbQueries.js';

const result = {
    error: true,
    msg: 'Error in init',
    data: null,
};

const getAll = async (req, res) => {

    const userId = req.user.id;
    // тестовое - создать отдельную модель по работе с товарными группами
    console.log('user id  - ', userId);
    const query = 'SELECT * FROM zapchasti_model, zapchasti_toType WHERE zapchasti_toType.id = zapchasti_model.id AND zapchasti_toType.idType = 1 LIMIT 100';
    const resdb = await executeQuery('profitools', query);
    result.data = resdb;
    return res.json(result);
  
};

export default {
    getAll,
};
