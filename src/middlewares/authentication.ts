import Config from "../config";
import { UserDTO } from '../models/user/user.interface';
import { userAPI } from '../apis/user';
import Logger from "../services/logger";

const jwt = require('jsonwebtoken');

type TokenPayLoad = {
  userId: any;
  email: string;
  admin: boolean
};

export const generateAuthToken = async (user: UserDTO): Promise<string> => {
  const payload: TokenPayLoad = { userId: user.id, email: user.email, admin: user.admin };
  const token = await jwt.sign(payload, Config.TOKEN_SECRET_KEY, { expiresIn: Config.TOKEN_KEEP_ALIVE });

  return token;
}

export const checkAuth = async (token: any) => {
  try {
    const decode: TokenPayLoad = await jwt.verify(token, Config.TOKEN_SECRET_KEY);
    const user = await userAPI.getUserById(decode.userId);

    return user;
  } catch (error: any) {
    Logger.error(error);

    return false;
  }
}