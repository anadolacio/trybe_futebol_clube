import * as bcryptjs from 'bcryptjs';
import TokenGenerator, { Token, User } from '../Interfaces/ITokenGenerator';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUserModel from '../Interfaces/users/IUserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel,
    private tokenGenerator: TokenGenerator,
    private unauthorized: string = 'Invalid email or password',
  ) {}

  public getUserEmail = async (user: User): Promise<ServiceResponse<Token>> => {
    const { email, password } = user;

    const userFound = await this.userModel.getUserEmail(email);

    if (!userFound) {
      return { status: 'UNAUTHORIZED', data: { message: this.unauthorized } };
    }

    const validPassword = bcryptjs.compareSync(password, userFound.password);
    if (!validPassword) {
      return { status: 'UNAUTHORIZED', data: { message: this.unauthorized } };
    }
    const token = this.tokenGenerator.generate(user);
    return { status: 'SUCCESSFUL', data: { token } };
  };

  public getUserByRole = async (token: string): Promise<ServiceResponse<{ role: string }>> => {
    const user = this.tokenGenerator.decode(token);
    const userFound = await this.userModel.getUserEmail(user);
    if (!userFound) {
      return { status: 'UNAUTHORIZED', data: { message: this.unauthorized } };
    }
    return { status: 'SUCCESSFUL', data: { role: userFound.role } };
  };
}
