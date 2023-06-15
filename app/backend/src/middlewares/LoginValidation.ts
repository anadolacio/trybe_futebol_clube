import { NextFunction, Request, Response } from 'express';

export default class LoginValidation {
  static userValidation(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }
}
