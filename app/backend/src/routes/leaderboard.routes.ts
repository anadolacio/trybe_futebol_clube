import { Request, Response, Router } from 'express';
import LeaderboardModel from '../models/LearderboardModel';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardModel = new LeaderboardModel();
const leaderboardService = new LeaderboardService(leaderboardModel);
const leaderboardController = new LeaderboardController(leaderboardService);

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAllInformations(req, res),
);

export default router;
