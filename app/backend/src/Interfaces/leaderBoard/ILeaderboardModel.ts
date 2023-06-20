import { LeaderboardParams } from './ILeaderboard';

export default interface ILeaderboardModel {
  getAllInformations(): Promise<LeaderboardParams[] | null>;
}
