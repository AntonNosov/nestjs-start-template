import { User } from '../../users/interfaces/users.interface'

export interface Auth {
  init(authData: object): void;

  getUser(): Promise<User>;
}