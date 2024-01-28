export interface UserI {
  _id?: string
  email: string
  password: string
  firstName: string
  lastName: string
  age: number
  admin: boolean
  cellphone: number
  address: object
  alias: string
  timestamp: string
}

export class UserDTO {
  id?: any
  email: string
  password: string
  firstName: string
  lastName: string
  age: number
  admin: boolean
  cellphone: number
  address: object
  alias: string
  timestamp: string

  constructor(data: UserI) {
    this.id = data._id || '';
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age;
    this.admin = data.admin;
    this.cellphone = data.cellphone;
    this.address = data.address;
    this.alias = data.alias;
    this.timestamp = data.timestamp
  }
}

export interface UserQueryI {
  email?: string
}

export interface UserBaseClass {
  login(data: UserDTO): Promise<UserDTO>;
  signup(data: UserDTO): Promise<UserDTO>;
  getUsers([]): Promise<UserDTO[]>;
  getUserById(id: string): Promise<UserDTO>;
  deleteUser(id: string): Promise<any>;
  query(query: any): Promise<UserDTO>;
}