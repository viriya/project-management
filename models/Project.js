import mongoose from 'mongoose';

const { String, ObjectId, Boolean } = mongoose.Schema.Types;

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tasks: [
      {
        task: String,
        completed: {
          type: Boolean,
          completed: false,
        },
      },
    ],
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project ||
  mongoose.model('Project', ProjectSchema);
