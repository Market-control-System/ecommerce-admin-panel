import pkg from 'jsonwebtoken';
import { configAuth } from '../inc/configService.js';

const { sign } = pkg;

const generate = (userId, userRole) => {
  try {
    const token = jwt.sign(
      { 
        id: userId, 
        role: userRole // 0 для админа, 1-10 для других уровней доступа
      }, 
      configAuth.secret_key,
      { expiresIn: configAuth.expires_key }
    );
  
    return {err:false, token:token};

  } catch(err) {
    return {err:true, msg:`Error in generate token - ${err}`}
  }
};

const decode = (token) => {
  try {
    const decoded = jwt.verify(token, configAuth.secret_key);
    //  decoded.id и decoded.role
    return {err:false, user:{id:decoded.id, role:decoded.role}}
  } catch (err) {
    return {err:true, msg:`Error decode token - ${err}`}
  }
}; 

export default {
  generate,
};