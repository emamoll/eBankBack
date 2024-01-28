import UserDAO from './user.mongo';
import { PersistenceType } from '../../../config';
import Logger from '../../../services/logger';

export class UserFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case PersistenceType.AtlasMongo:
        Logger.info('Retornando instancia clase User Mongo Atlas');
        return new UserDAO();
      default:
        Logger.info('Retornando por defecto instancia clase User Mongo Atlas');
        return new UserDAO();
    }
  }
}