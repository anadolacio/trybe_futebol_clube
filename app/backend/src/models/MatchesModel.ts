// import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
// import IMatches from '../Interfaces/matches/IMatches';
// import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';

// export default class MatchesModel implements IMatchesModel {
//   private model = SequelizeMatchesModel;

//   async getAllMatches(): Promise<IMatches[]> {
//     const allMatches = await this.model.findAll();
//     return allMatches.map(({
//       id,
//       homeTeamId,
//       homeTeamGoals,
//       awayTeamId,
//       awayTeamGoals,
//       inProgress,
//     }) => (
//       { id,
//         homeTeamId,
//         homeTeamGoals,
//         awayTeamId,
//         awayTeamGoals,
//         inProgress,
//       }
//     ));
//   }
// }
