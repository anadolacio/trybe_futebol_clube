import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import db from '.';
  
class TeamsModel extends Model<InferAttributes<TeamsModel>,
  InferCreationAttributes<TeamsModel>> {
declare id: CreationOptional<number>;
declare teamName: CreationOptional<number>;
}

TeamsModel.init({
  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      }
  }, {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  });
 
  export default TeamsModel;
  