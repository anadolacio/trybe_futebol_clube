import TeamsModel from '../models/TeamsModel';
import IMatches from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  private teamModel = new TeamsModel();
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

  public async createNewMatch(data: IMatches): Promise<ServiceResponse<IMatches>> {
    const { homeTeamId, awayTeamId } = data;
    const getHomeTeamId = await this.teamModel.getTeamById(Number(homeTeamId));
    const getAwayTeamId = await this.teamModel.getTeamById(Number(awayTeamId));

    if (!getAwayTeamId || !getHomeTeamId) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchesModel.createNewMatch(data);
    return { status: 'CREATED', data: newMatch };
  }
}
