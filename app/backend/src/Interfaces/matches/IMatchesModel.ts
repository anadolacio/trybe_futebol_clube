import IMatches from './IMatches';

export interface IMatchesModel {
  getAllMatches(): Promise<IMatches[]>;
  getMatchesByProgress(status: string): Promise<IMatches[]>;
  updateUnfinishedMatches(id: number): Promise<string>;
  updateScore(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number>;
}
