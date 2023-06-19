import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchesModel from '../database/models//SequelizeMatchesModel';

import { Response } from 'superagent';
import MatchesMock from './mocks/Matches.Mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches fluxo testes', () => {
  beforeEach(() => sinon.restore());

  it('Teste se retorna todos os matches', async () => {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(MatchesMock.allMatches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(MatchesMock.allMatches);
  });

//   it('Teste se retorna teams por ID', async () => {
//     sinon.stub(SequelizeTeamsModel, 'findByPk').resolves(TeamMock.team as any);

//     const { status, body } = await chai.request(app).get('/teams/5');

//     expect(status).to.equal(200);
//     expect(body).to.deep.equal(TeamMock.team);
//   });

//   it('Teste se retorna teams por ID retorna nulo se ID for inválido', async () => {
//     sinon.stub(SequelizeTeamsModel, 'findByPk').resolves(null);

//     const { status, body } = await chai.request(app).get('/teams/999');

//     expect(status).to.equal(200);
//     expect(body).to.deep.equal(null);
//   });
});
