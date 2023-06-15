import IUsers from './IUsers';

export default interface IUserModel {
  getUserEmail(email: string): Promise<IUsers | null>;
}
