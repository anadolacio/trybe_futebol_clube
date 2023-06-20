import { Response, Request } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
  ) { }

  async getAllInformations(_req: Request, res: Response) {
    const allInformation = await this.leaderboardService.getAllInformations();
    // console.log('RESULTADO', allInformation);
    return res.status(mapStatusHTTP(allInformation.status)).json(allInformation.data);
  }
}
