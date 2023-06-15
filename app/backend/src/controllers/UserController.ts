import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService: UserService,
  ) {}

  public getUserEmail = async (req: Request, res: Response) => {
    const { data } = await this.userService.getUserEmail(req.body);
    res.status(200).json(data);
  };
}
