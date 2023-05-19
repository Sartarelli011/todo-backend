import express from "express";
import { UserController } from "../controller/userController";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/register", userController.create.bind(userController));
userRouter.post("/login", userController.login.bind(userController));

export default userRouter;
