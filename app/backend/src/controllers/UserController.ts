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
}
