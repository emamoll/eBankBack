import dotenv from 'dotenv';

dotenv.config();

export enum PersistenceType {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  AtlasMongo = 'ATLAS-MONGO',
  Firebase = 'FIREBASE'
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,
  PERSISTENCIA: PersistenceType.AtlasMongo,
  MONGO_LOCAL_SRV: process.env.MONGO_LOCAL_SRV || 'mongoLocalsrv',
  MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || 'mongosrv',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  GMAIL_NAME: process.env.GMAIL_NAME || 'Nombre Apellido',
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioId',
  TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
  TWILIO_WPP_CELLPHONE: process.env.TWILIO_WPP_CELLPHONE || '123456789',
  ADMIN_PHONE: process.env.ADMIN_PHONE || '+549351000000',
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY || 'mySecretTokenKey',
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || '15m'
}