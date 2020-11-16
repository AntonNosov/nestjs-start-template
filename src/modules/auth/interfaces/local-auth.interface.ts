import { Auth } from './auth.interface'

export interface LocalAuth extends Auth {
  login: string;
  password: string;
}