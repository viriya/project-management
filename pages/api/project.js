import Project from '../../models/Project';
import db from '../../utils/db';
import jwt from 'jsonwebtoken';

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
  res.status(200).json({ project });
}

async function handlePostRequest(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      return res.status(422).send('Project missing one or more fields');
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const project = await new Project({
      name,
      description,
      user: userId,
    }).save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error in creating project');
  }
}

async function handleDeleteRequest(req, res) {
  const { _id } = req.query;
  try {
    await Project.findOneAndDelete({ _id });
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting project');
  }
}
