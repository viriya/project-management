// import products from "../../static/products.json";
import Project from '../../models/Project';
import db from '../../utils/db';
import jwt from 'jsonwebtoken';
const { userId } = jwt.verify(req.headers.authorization, JWT_SECRET);
db();

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  //res.status(200).send(req.headers.Authorization)
  try {
    const { userId } = jwt.verify(req.headers.authorization, JWT_SECRET);
    //const projects = []
    const projects = await Project.find({ user: userId });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(403).send('Please login again');
  }
};
