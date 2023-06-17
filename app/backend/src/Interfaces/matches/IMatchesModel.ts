import IMatches from './IMatches';

export interface IMatchesModel {
  getAllMatches(): Promise<IMatches[]>,
  getMatchesByProgress(status: string): Promise<IMatches[]>
}
