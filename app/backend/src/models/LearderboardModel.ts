import SequelizMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizTeamsModel from '../database/models/SequelizeTeamsModel';
import { LeaderboardParams } from '../Interfaces/leaderBoard/ILeaderboard';
import ILeaderboardModel from '../Interfaces/leaderBoard/ILeaderboardModel';

export default class leaderBoardModel implements ILeaderboardModel {
  private model = SequelizMatchesModel;

  async getAllInformations(): Promise<LeaderboardParams[] | null> {
    const result = await this.model.findAll(
      { where: { inProgress: false },
        include: [
          {
            model: SequelizTeamsModel,
            as: 'homeTeam',
            attributes: { exclude: ['id'] },
          },
          {
            model: SequelizTeamsModel,
            as: 'awayTeam',
            attributes: { exclude: ['id'] },
          },
        ],
      },
    );

    if (!result) return null;

    return result;
  }
}
