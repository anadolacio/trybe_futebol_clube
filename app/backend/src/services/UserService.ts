import TokenGenerator, { Token, User } from '../Interfaces/TokenGenerator';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private tokenGenerator: TokenGenerator,
  ) {}

  public getUserEmail = async (user: User): Promise<ServiceResponse<Token>> => {
    const token = this.tokenGenerator.generate(user);
    return { status: 'SUCCESSFUL', data: { token } };
  };
}
