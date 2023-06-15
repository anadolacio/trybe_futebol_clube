import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import db from '.';
import TeamsModel from './SequelizeTeamsModel';

class SequelizeMatchesModel extends Model<
InferAttributes<SequelizeMatchesModel>,
InferCreationAttributes<SequelizeMatchesModel>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatchesModel.hasMany(
  TeamsModel,
  { foreignKey: 'homeTeamId', as: 'homeTeam' },
);
SequelizeMatchesModel.hasMany(
  TeamsModel,
  { foreignKey: 'awayTeamId', as: 'awayTeam' },
);

TeamsModel.hasMany(SequelizeMatchesModel, { foreignKey: 'homeTeamId' });
TeamsModel.hasMany(SequelizeMatchesModel, { foreignKey: 'awayTeamId' });

export default SequelizeMatchesModel;
