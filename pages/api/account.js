import User from '../../models/User';
import jwt from 'jsonwebtoken';
import db from '../../utils/db';
const JWT_SECRET = 'TC6T9Urte049vkuKGSMT2v3Z0CpWGUzz';
db();

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }

  try {
    const { userId } = jwt.verify(req.headers.authorization, JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(403).send('Invalid token');
  }
};
