import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import ITeams from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeamsModel;

  async getAllTeams(): Promise<ITeams[]> {
    const allTeams = await this.model.findAll();
    return allTeams.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async getTeamById(id: number): Promise<ITeams | null> {
    const item = await this.model.findByPk(id);
    if (!id) return null;
    return item;
  }
}
