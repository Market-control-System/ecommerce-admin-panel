import authModul from '../models/authModel.js';
import tokenGenerator from '../utils/tokenGenerator.js';

const result = {
    error: true,
    msg: 'Error in init',
    data: null,
};

const login = async (req, res) => {
  try {
      const { phoneNumber, password } = req.body;
      const user = await authModul.authenticate(phoneNumber, password);
      if (!user) {
          result.error = true;
          result.msg = 'Authentication failed';
          return res.json(result);
      }
      const token = tokenGenerator.generate(user.id, user.role);

      result.error = false;
      result.data  = {
        token:token,
      }
      return res.json(result);
  } catch (error) {
      result.error = true;
      result.msg = `Internal server error. Msg = ${error}`;
      return res.json(result);
  }
};

export default {
  login,
};
