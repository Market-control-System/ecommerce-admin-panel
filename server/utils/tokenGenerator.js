import jwt from 'jsonwebtoken';
import { configAuth } from '../inc/configService.js';

const generate = async (data) => {
  try {
    //data = { id, role, userName, dateCreate, dateUpdate, block }
    const token = jwt.sign(
      data, 
      configAuth.secret_key,
      { expiresIn: configAuth.expires_key }
    );
  
    return {err:false, token:token};

  } catch(err) {
    return {err:true, msg:`Error in generate token - ${err}`}
  }
};

const decodeToken = async (token) => {
  try {
    console.log('decoded token');
    return jwt.verify(token, configAuth.secret_key);
  } catch (err) {
    throw new Error(`Error decode token - ${err}`);
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.log('error token');
    return res.send({err:true, msg:'A token is required for authentication'});
  }

  try {
    console.log('ver token ', token);
    req.user = jwt.verify(token, configAuth.secret_key);
    console.log('user id - ', req.user);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.send({ err: true, msg: 'Token expired', tokenExpired: true });
    }
    return res.send({err:true, msg:'Invalid Token'});
  }
};

const tokenUtil = { generate, verifyToken };

export default tokenUtil;