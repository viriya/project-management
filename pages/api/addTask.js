import Project from '../../models/Project';
import db from '../../utils/db';
import jwt from 'jsonwebtoken';

db();

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  const { projectId, task } = req.body;
  try {
    if (!task) {
      return res.status(422).send('Missing task field');
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const project = await Project.findOneAndUpdate(
      { _id: projectId },
      { $push: { tasks: { task, completed: false } } },
      { new: true }
    );
    res.status(201).json(project.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error in adding task');
  }
};
