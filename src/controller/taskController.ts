import { Request, Response } from "express";
import { TaskService } from "../service/taskService";
export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public async get(request: Request, response: Response): Promise<void> {
    try {
      const task = await this.taskService.getTask();
      response.status(200).send(task);
    } catch (error) {
      response.status(400).send("Houve algum erro ao trazer as informações");
    }
  }

  public async add(request: Request, response: Response): Promise<void> {
    const data = request.body;
    try {
      const task = await this.taskService.addTask(data);
      response.status(200).send(task);
    } catch (error) {
      response.status(400).send("Houve um erro na criação da task.");
    }
  }
  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const data = request.body;
    try {
      const updatedTask = await this.taskService.updateTask(id, data);
      console.log("task atualizada com sucesso!");
      response.status(200).send(updatedTask);
    } catch (error) {
      response
        .status(400)
        .send("Houve algum problema ao tentar realizar a atualização");
    }
  }
  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    try {
      await this.taskService.deleteTask(id);
      response.status(200).send("task deletada com sucesso.");
    } catch (error) {
      response
        .status(400)
        .send("Houve algum problema ao tentar realizar a exclusão");
    }
  }
}
