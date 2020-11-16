import { Roles } from '../constants/Roles'

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  login: string;
  email?: string;
  password?: string;
  passwordHash?: string;
  role?: Roles;
  active?: boolean;
  photo?: string;
  lastActivity?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}