import jwt from 'jsonwebtoken';
import { configAuth } from '../inc/configService.js';

const generate = async (data) => {
  try {
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

const decode = async (token) => {
  try {
    const decoded = jwt.verify(token, configAuth.secret_key, (err, decoded) => {
      if (err) {
        return {err:true, msg:`Error in decode TOKEN. msg - ${err}`}
      } else {
        //  decoded.id и decoded.role
        return {err:false, user:decoded}
      }
    });
    
  } catch (err) {
    return {err:true, msg:`Error decode token - ${err}`}
  }
}; 

export default {
  generate,
  decode,
};