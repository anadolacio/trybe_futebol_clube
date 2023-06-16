import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import db from '.';
import SequelizeMatchesModel from './SequelizeMatchesModel';

class SequelizeTeamsModel extends Model<
InferAttributes<SequelizeTeamsModel>,
InferCreationAttributes<SequelizeTeamsModel>
> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

SequelizeTeamsModel.hasMany(SequelizeMatchesModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeTeamsModel.hasMany(SequelizeMatchesModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeMatchesModel.belongsTo(SequelizeTeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatchesModel.belongsTo(SequelizeTeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default SequelizeTeamsModel;
