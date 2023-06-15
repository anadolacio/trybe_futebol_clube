import SequelizeUsersModel from '../database/models/SequelizeUsersModel';
import IUsers from '../Interfaces/users/IUsers';
import IUserModel from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUsersModel;

  async getUserEmail(email: string): Promise<IUsers | null> {
    const result = await this.model.findOne({
      where: {
        email,
      },
    });
    if (!result) return null;

    return result;
  }
}
