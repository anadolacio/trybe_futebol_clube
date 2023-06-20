import { LeaderboardParams, ILeaderboard } from '../Interfaces/leaderBoard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/LearderboardModel';
import IMatches from '../Interfaces/matches/IMatches';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: LeaderboardModel,
  ) { }

  private static constructorLeaderboard(matches: LeaderboardParams[]) {
    const result: { [teamName: string]: ILeaderboard } = {};

    matches.forEach((match) => {
      const homeTeamName = match.homeTeam?.teamName;

      if (homeTeamName !== undefined && !result[homeTeamName]) {
        result[homeTeamName] = LeaderboardService.createLeaderboard(homeTeamName);
      }

      if (homeTeamName && result[homeTeamName]) {
        this.updateLeaderboard(result[homeTeamName], match);
      }
    });

    return result;
  }

  private static updateLeaderboard(data: ILeaderboard, match: LeaderboardParams) {
    const entryData = data;
    entryData.totalGames += 1;
    entryData.goalsFavor += match.homeTeamGoals;
    entryData.goalsOwn += match.awayTeamGoals;
    entryData.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;

    if (LeaderboardService.isAVictory(match)) {
      this.updateVictoryStatus(entryData);
    }

    if (LeaderboardService.isADraw(match)) {
      this.updateDrawStatus(entryData);
    }

    if (LeaderboardService.isALoss(match)) {
      entryData.totalLosses += 1;
    }
  }

  private static updateVictoryStatus(data: ILeaderboard) {
    const entryData = data;

    entryData.totalPoints += 3;
    entryData.totalVictories += 1;
  }

  private static updateDrawStatus(data: ILeaderboard) {
    const entryData = data;

    entryData.totalPoints += 1;
    entryData.totalDraws += 1;
  }

  private static isAVictory(match: IMatches): boolean {
    return match.homeTeamGoals > match.awayTeamGoals;
  }

  private static isADraw(match: IMatches): boolean {
    return match.homeTeamGoals === match.awayTeamGoals;
  }

  private static isALoss(match: IMatches): boolean {
    return match.homeTeamGoals < match.awayTeamGoals;
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

  private static orderLeaderboard(data: ILeaderboard[]) {
    data.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });
  }

  private static leaderboardEfficiency(data: ILeaderboard[]) {
    data.forEach((team) => {
      const entryData = team;
      entryData.efficiency = +((entryData.totalPoints / (entryData.totalGames * 3)) * 100)
        .toFixed(2);
    });
  }

  public async getAllInformations(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allInformation = await this.leaderboardModel.getAllInformations() as LeaderboardParams[];

    const result = LeaderboardService.constructorLeaderboard(allInformation);
    // console.log('RESULT', result);
    const resultArray = Object.values(result);
    // console.log('ARRAY', resultArray);
    LeaderboardService.orderLeaderboard(resultArray);
    LeaderboardService.leaderboardEfficiency(resultArray);
    return { status: 'SUCCESSFUL', data: resultArray };
  }
}
