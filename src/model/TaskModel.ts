import { Schema, model } from "mongoose";

export interface ITask {
  task: string;
  completed: boolean;
  userId: string;
}

const TaskSchema = new Schema<ITask>({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
});

export const Task = model<ITask>("Task", TaskSchema);
