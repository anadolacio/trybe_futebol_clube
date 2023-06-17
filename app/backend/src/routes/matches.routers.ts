import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import TokenValidation from '../middlewares/TokenValidation';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id',
  TokenValidation.isTokenValid,
  (req: Request, res: Response) => matchesController.updateScore(req, res),
);
router.patch(
  '/:id/finish',
  TokenValidation.isTokenValid,
  (req: Request, res: Response) => matchesController.updateUnfinishedMatches(req, res),
);

export default router;
