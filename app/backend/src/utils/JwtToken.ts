import * as jwt from 'jsonwebtoken';
import TokenGenerator, { User } from '../Interfaces/ITokenGenerator';

export default class JwtToken implements TokenGenerator {
  private jwt = jwt;
  private secret = process.env.JWT_SECRET || 'secret';

  generate(user: User): string {
    const { email, password } = user;
    const token = this.jwt.sign({ email, password }, this.secret);
    return token;
  }

  decode(token: string): string {
    const decodedToken = this.jwt.decode(token, { complete: true });
    if (!decodedToken) return '';
    return decodedToken.payload.email;
  }

  verify(token: string): boolean {
    try {
      this.jwt.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
