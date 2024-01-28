import Config from '../config';
import mongoose from 'mongoose';
import Logger from './logger';

export class MongoDBClient {
  private static client: MongoDBClient;

  private constructor() { }

  static async getConnection(local: boolean = false) {
    if (!MongoDBClient.client) {
      Logger.info('Iniciamos la conexion con mongo');

      const srv = local ? Config.MONGO_LOCAL_SRV : Config.MONGO_ATLAS_SRV;

      await mongoose.connect(srv, {});

      MongoDBClient.client = new MongoDBClient();
    }
    return MongoDBClient.client;
  }
}