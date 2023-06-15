import * as jwt from 'jsonwebtoken';
import TokenGenerator, { User } from '../Interfaces/ITokenGenerator';

export default class JwtToken implements TokenGenerator {
  private jwt = jwt;

  generate(user: User): string {
    const { email, password } = user;
    const secret = process.env.JWT_SECRET || 'secret';
    const token = this.jwt.sign({ email, password }, secret);
    return token;
  }
}
