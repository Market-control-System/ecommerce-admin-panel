// работа с паролями
import bcrypt from 'bcrypt';

export const comparePassword = async (password, hash) => {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Error comparing password and hash:', error);
      return false;
    }
  };

export const generatePasswordHash = async (password) => {
    const saltRounds = 10; // Количество раундов генерации соли
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      console.error('Error generating password hash:', error);
      return false;
    }
  };