import { Request, Response } from "express";
import { UserService } from "../service/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async create(request: Request, response: Response) {
    const data = request.body;

    try {
      const newUser = await this.userService.createUser(data);
      response.status(200).json(newUser);
    } catch (error) {
      if (error.message === "Email já cadastrado") {
        response.status(400).json({ error: "Email já cadastrado" });
      } else {
        response.status(500).json({ error: "Erro ao criar usuário" });
      }
    }
  }

  public async login(request: Request, response: Response) {
    const data: any = request.body;
    try {
      const userData = await this.userService.loginUser(data);
      console.log(userData);

      response
        .status(200)
        .send({ userId: userData.userId, token: userData.token });
    } catch (error) {
      response.status(400).json({ error: "Email or password incorrect" });
    }
  }
}
