import { NextFunction, Request, Response } from 'express';
import JwtToken from '../utils/JwtToken';

export default class TokenValidation {
  static isTokenValid(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const tokenVeirication = new JwtToken();
    const isValidToken = tokenVeirication.verify(authorization);
    if (!isValidToken) return res.status(401).json({ message: 'Token must be a valid token' });
    return next();
  }
}
