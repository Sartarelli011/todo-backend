import { Task, ITask } from "../model/TaskModel";

export class TaskService {
  public async getTask(): Promise<ITask[]> {
    const data = await Task.find();
    return data;
  }

  public async addTask(data: ITask): Promise<ITask> {
    const { userId, task } = data;

    if (userId === null) {
      throw new Error("task sem identificação");
    }
    if (task === null) {
      throw new Error(" campo task em branco");
    }

    const newTask = new Task({
      task: task,
      completed: false,
      userId: userId,
    });
    console.log("task: ", newTask);
    try {
      const savedTask = await newTask.save();
      return savedTask;
    } catch (error) {
      throw new Error("não foi possivel salvar a task.");
    }
  }

  public async updateTask(id: string, data: ITask): Promise<ITask> {
    try {
      const task = await Task.findByIdAndUpdate({ _id: id }, data);
      return task;
    } catch (error) {
      throw new Error("problema ao fazer o  update da task");
    }
  }
  public async deleteTask(id: string): Promise<void> {
    if (id === null) {
      throw new Error("não foi possivel receber o Id");
    }

    try {
      await Task.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new Error("Error problema ao deletar task");
    }
  }
}
