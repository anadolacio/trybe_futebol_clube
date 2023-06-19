import { Response, Request } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    // const serviceResponse = await this.matchesService.getAllMatches();
    // res.status(200).json(serviceResponse.data);
    const inProgress = req.query.inProgress as string;
    let serviceResponse = null;
    if (inProgress) {
      serviceResponse = await this.matchesService.getMatchesByProgress(inProgress);
    } else {
      serviceResponse = await this.matchesService.getAllMatches();
    }

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateUnfinishedMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.updateUnfinishedMatches(Number(id));
    return res.status(mapStatusHTTP(status)).json({ message: data });
  }

  public async updateScore(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchesService
      .updateScore(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(mapStatusHTTP(status)).json({ data });
  }

  public async createNewMatch(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    if (homeTeamId === awayTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!homeTeamId || !homeTeamGoals || !awayTeamId || !awayTeamGoals) {
      return res.status(400).json({ message: 'Some fields are missing' });
    }

    const { status, data } = await this.matchesService
      .createNewMatch({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
