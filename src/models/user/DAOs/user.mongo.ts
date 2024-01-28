import { UserModel } from '../user.schema';
import { MongoDBClient } from '../../../services/mongodb';
import { UserBaseClass, UserI } from '../user.interface';
import { UserDTO } from '../user.interface';
import Logger from '../../../services/logger';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { alias } from '../../../alias';

export default class UserDAO implements UserBaseClass {
  private static instance: UserDAO;
  private static client: MongoDBClient;
  user: any = UserModel;

  constructor() { };

  // Creo instancia de conexion a Mongo

  static async getInstance() {
    if (!UserDAO.instance) {
      Logger.info('Inicializamos DAO User con Mongo Atlas');

      await MongoDBClient.getConnection();

      UserDAO.instance = new UserDAO();
      UserDAO.client = await MongoDBClient.getConnection()
    }
    return UserDAO.instance
  }

  // Logueo de usuarios

  async login(data: UserDTO): Promise<UserDTO> {
    try {
      const user = data.email;
      const response = await this.user.fondOne({user});

      if (!response) throw new Error('El usuario no existe');

      return response;
    } catch (error: any) {
      Logger.error('Error al loguear el usuario');
      throw new Error(`Error al loguear el usuario: ${error.message}`);
    }
  }

  // Registro de usuarios

  async signup(data: UserDTO): Promise<UserDTO> {
    try {
      const addUser: UserDTO = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        admin: false,
        cellphone: data.cellphone,
        address: data.address,
        alias: alias(),
        timestamp: moment().format('DD-MMM-YYYY HH:mm:ss'),
      }
      const newUser = new this.user(addUser);

      Logger.info(`Nuevo usuario: ${newUser}`);

      await newUser.save();

      return newUser;
    } catch (error: any) {
      Logger.error('Error al registrar el usuario');
      throw new Error(`Error al registrar el usuario: ${error.message}`);
    }
  }

  // Busco todos los usuarios

  async getUsers(): Promise<UserDTO[]> {
    try {
      const response = await this.user.find();

      return response;
    } catch (error: any) {
      Logger.error('Error al buscar todos los usuarios');
      throw new Error(`Error al buscar todos los usuarios: ${error.message}`);
    }
  }

  // Busco el usuario por su id

  async getUserById(id: string): Promise<UserDTO> {
    try {
      const response = await this.user.findById(id);

      if(!response) throw new Error('El uuario no exite');

      return response;
    } catch (error: any) {
      Logger.error('Error al buscar el usuario por su Id');
      throw new Error(`Error al buscar el usuario por su Id: ${error.message}`);
    }
  }

  // Elimino el usuario

  async deleteUser(id: string): Promise<any> {
    try {
      const response = await this.user.findByIdAndDelete(id);

      return response;
    } catch (error: any) {
      Logger.error('Error al eliminar el usuario');
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
  }

  // Query de usuarios

  async query(query: any): Promise<UserDTO> {
    const response = await this.user.find(query);

    return response[0];
  }

  // Valido la contraseña

  async validatePassword(user: UserI, password: string) : Promise<boolean> {
    const emailUser = user.email;
    const response = await this.user.findOne({email: emailUser});

    if (!response) return false
    const compare = await bcrypt.compare(password, response.password);

    if (!compare) return false

    return true;
  }
}