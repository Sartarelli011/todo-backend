import express from "express";
import { TaskController } from "../controller/taskController";
import { authorization as auth } from "../auth/userAuth";

const todoRouter = express.Router();
const todoController = new TaskController();

todoRouter.get("/", auth, todoController.get.bind(todoController));
todoRouter.post("/", auth, todoController.add.bind(todoController));
todoRouter.put("/:id", auth, todoController.update.bind(todoController));
todoRouter.delete("/:id", auth, todoController.delete.bind(todoController));

export default todoRouter;
