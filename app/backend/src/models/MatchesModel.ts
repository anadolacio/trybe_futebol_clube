import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import IMatches from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatchesModel;

  async getAllMatches(): Promise<IMatches[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches.map((match) => match);
  }
}
