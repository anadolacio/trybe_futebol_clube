import { LeaderboardParams, ILeaderboard } from '../Interfaces/leaderBoard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/LearderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: LeaderboardModel,
  ) { }

  private static constructorLeaderboard(matches: LeaderboardParams[]) {
    const leaderboard: { [teamName: string]: ILeaderboard } = {};

    matches.forEach((match) => {
      const homeTeamName = match.homeTeam?.teamName;

      if (homeTeamName !== undefined && !leaderboard[homeTeamName]) {
        leaderboard[homeTeamName] = LeaderboardService.createLeaderboard(homeTeamName);
      }
    });

    return leaderboard;
  }

  private static createLeaderboard(name: string): ILeaderboard {
    return {
      name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  public async getAllInformations(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allInformation = await this.leaderboardModel.getAllInformations() as LeaderboardParams[];

    const result = LeaderboardService.constructorLeaderboard(allInformation);
    // console.log('RESULT', result);
    const resultArray = Object.values(result);
    // console.log('ARRAY', resultArray);
    return { status: 'SUCCESSFUL', data: resultArray };
  }
}
