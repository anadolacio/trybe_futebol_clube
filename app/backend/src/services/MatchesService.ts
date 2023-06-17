import IMatches from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByProgress(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.getMatchesByProgress(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateUnfinishedMatches(id:number): Promise<ServiceResponse<string>> {
    const unfinishedMatch = await this.matchesModel.updateUnfinishedMatches(id);
    return { status: 'SUCCESSFUL', data: unfinishedMatch };
  }

  public async updateScore(id:number, homeTeamGoals:number, awayTeamGoals:number):
  Promise<ServiceResponse<number>> {
    const score = await this.matchesModel.updateScore(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: score };
  }
}
