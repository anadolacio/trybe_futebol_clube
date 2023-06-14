import ITeams from './ITeams';
import { ID } from '../index';

export interface ITeamsModel {
  getAllTeams(): Promise<ITeams[]>;

  getTeamById(id: ID): Promise<ITeams | null>;
}
