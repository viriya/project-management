import Project from '../../models/Project';
import db from '../../utils/db';
import jwt from 'jsonwebtoken';
const { userId } = jwt.verify(req.headers.authorization, JWT_SECRET);
db();

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'POST':
      await handlePostRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  const { _id } = req.query;
  const project = await Project.findOne({ _id });
  res.status(200).json(project);
}

async function handlePostRequest(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  const { projectId, task } = req.body;
  try {
    if (!task) {
      return res.status(422).send('Missing task field');
    }
    const { userId } = jwt.verify(req.headers.authorization, JWT_SECRET);

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
}

async function handleDeleteRequest(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  const { projectId, taskId } = req.query;
  try {
    if (!projectId || !taskId) {
      return res.status(422).send('missing task field');
    }
    const { userId } = jwt.verify(req.headers.authorization, JWT_SECRET);

    const project = await Project.findOneAndUpdate(
      { _id: projectId },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );
    console.log(project);
    res.status(201).json(project.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error in adding task');
  }
}
