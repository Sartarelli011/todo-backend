import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./router/userRouter";
import todoRouter from "./router/todoRouter";
const PORT = process.env.PORT;
const DB = process.env.DB_CONNECT_URL;
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error, "db not connected");
  });

app.use("/user", userRouter);
app.use("/api", todoRouter);

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
