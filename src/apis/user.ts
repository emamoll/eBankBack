import Config from '../config';
import { UserFactoryDAO } from '../models/user/DAOs/user.factory';
import { UserDTO, UserI, UserQueryI } from '../models/user/user.interface';
import { MongoDBClient } from '../services/mongodb';

class UserAPI {
  user;

  constructor() {
    // Instancia de conexion a mongoDB

    this.user = UserFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  }

  // Funcion de query

  async query(email?: string): Promise<UserDTO> {
    const query = { $or: [] as UserQueryI[] };

    if (email) query.$or.push({ email });

    const response = await this.user.query(query);

    return response;
  }

  // Funcion de logueo

  async login(data: UserDTO): Promise<UserDTO> {
    const user = await this.user.login(data);

    return user;
  }

  // Funcion de registro
  async signup(data: UserDTO): Promise<UserDTO> {
    const newUser = await this.user.signup(data);

    return newUser;
  }

  // Funcion para buscar todos los usuarios

  async getUsers(): Promise<UserDTO[]> {
    const users = await this.user.getUsers();

    return users;
  }

  // Funcion para buscar un usuario por su id

  async getUserById(id: string): Promise<UserDTO> {
    const user = await this.user.getUserById(id);

    return user;
  }

  // Funcion para eliminar un usuario

  async deleteUser(id: string): Promise<any> {
    const user = await this.user.deleteUser(id);

    return user;
  }

  // Funcion para validar la contraseña

  async validatePassword(user: any, password: string): Promise<boolean> {
    const userPassword = await this.user.validatePassword(user, password);

    return userPassword;
  }
}

export const userAPI = new UserAPI();