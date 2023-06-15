import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
// import matchesRouter from './matches.routers';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
// router.use('/matches', matchesRouter);
export default router;
