import { authenticate } from '../models/userModel';
import { generate } from '../utils/tokenGenerator';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authenticate(username, password);
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = generate(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  login,
};
