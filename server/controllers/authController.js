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
      //console.log('AUTH login - ', phoneNumber, ' | Pass - ', password);
      const user = await authModul.authenticate(phoneNumber, password);
      if (!user.err) {
          const token = await tokenGenerator.generate(user.data);
          if (!token.err) {
              result.error = false;
              result.msg = '';
              result.data  = {
                token:token.token,
                user:user.data,
              }
          } else {
              result.error = true;
              result.msg += `Error in TOKEN generate. MSG - ${token.msg}`;
              result.data = null;
          }
      
          return res.json(result);
      } else {
          result.error = true;
          result.msg = 'Authentication failed. ' + user.msg;
          result.data = null;
          return res.json(result);
      }
  } catch (error) {
      result.error = true;
      result.msg = `Internal server error. Msg = ${error}`;
      result.data = null;
      return res.json(result);
  }
};

export default {
  login,
};
