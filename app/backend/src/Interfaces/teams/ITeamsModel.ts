import ITeams from './ITeams';

export interface ITeamsModel {
  getAllTeams(): Promise<ITeams[]>;
}
