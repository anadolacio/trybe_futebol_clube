export interface ICRUDModelReader<T> {
  getAllTeams(): Promise<T[]>,
}

export type ICRUDModel<T> = ICRUDModelReader<T>;
