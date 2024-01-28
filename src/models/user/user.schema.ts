import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { alias } from '../../alias';
import moment from 'moment';

const Schema = mongoose.Schema;

// Nombre de la coleccion

export const UserCollectionName = 'users';

// Esquema de Joi de la Direccion del usuario

export const AddressJoiSchema = Joi.object({
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.number().required(),
  postalCode: Joi.number().required(),
})

// Esquema de Joi

export const UserJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  admin: Joi.boolean(),
  cellphone: Joi.number().required(),
  address: AddressJoiSchema,
  alias: Joi.string(),
  timestamp: Joi.string(),
})

// Esquema de mongo

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    admin: { type: Boolean, default: true },
    cellphone: { type: Number, required: true },
    address: { type: Object, required: true },
    alias: {type: String, default: alias},
    timestamp: { type: String, default: moment().format('DD-MMM-YYYY HH:mm:ss') },
  },
  { versionKey: false }
);

// Encripto la contraseña

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
})

// Comparo la contraseña con la contraseña encriptada

UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

export const UserModel = mongoose.model(UserCollectionName, UserSchema);