import pkg from 'jsonwebtoken';

const { sign } = pkg;

const generate = (userId) => {
  return sign({ id: userId }, 'secret_key', { expiresIn: '1h' });
  // Используйте переменную окружения для 'secret_key'
};

export default {
  generate,
};
