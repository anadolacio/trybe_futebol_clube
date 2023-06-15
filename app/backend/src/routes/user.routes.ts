import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import JwtToken from '../utils/JwtToken';
import LoginValidation from '../middlewares/LoginValidation';

const tokenGenerator = new JwtToken();
const userService = new UserService(tokenGenerator);
const userController = new UserController(userService);

const router = Router();

router.post(
  '/',
  LoginValidation.userValidation,
  (req: Request, res: Response) => userController.getUserEmail(req, res),
);

export default router;
