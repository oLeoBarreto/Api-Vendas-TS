import { IUser } from './IUser';

export interface IUserIsAuthenticated {
  user: IUser;
  token: string;
}
