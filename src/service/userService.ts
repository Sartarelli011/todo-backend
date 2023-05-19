import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, User } from "../model/UserModel";
const secret = process.env.SECRET;

interface IuserResponse {
  userId: string;
  token: string;
}

export class UserService {
  public async createUser(data: IUser): Promise<IUser> {
    const { name, email, password, confirmPassword } = data;
    if (!name) {
      throw new Error("o nome é obrigatório");
    }
    if (!email) {
      throw new Error("o email é obrigatório.");
    }
    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem.");
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new Error("Email já cadastrado");
    }
    const salt = bcrypt.genSaltSync(14);
    const cryptpassword = bcrypt.hashSync(password, salt);

    try {
      const newUser = new User({
        name: name,
        email: email,
        password: cryptpassword,
      });
      return newUser.save();
    } catch (error) {
      throw new Error("problema ao criar e salvar o usuário");
    }
  }
  public async loginUser(data: IUser): Promise<IuserResponse> {
    const { email, password } = data;
    const loginUser = await User.findOne({ email: email });
    const passwordMatch = bcrypt.compare(password, loginUser.password);

    if (!loginUser) {
      throw new Error("Email or password incorrect");
    }

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = jwt.sign({ _id: loginUser._id }, secret);
    const user = { userId: loginUser.id, token: token };
    return user;
  }
}
