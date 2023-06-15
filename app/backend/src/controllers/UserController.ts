import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService: UserService,
  ) {}

  public getUserEmail = async (req: Request, res: Response) => {
    const { status, data } = await this.userService.getUserEmail(req.body);
    res.status(mapStatusHTTP(status)).json(data);
  };

  public getUserByRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const { status, data } = await this.userService.getUserByRole(authorization);
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
