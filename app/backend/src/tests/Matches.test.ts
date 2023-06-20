import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchesModel from '../database/models//SequelizeMatchesModel';
import MatchesService from '../services/MatchesService';

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

  it('Teste se retorna partidas finalizadas', async () => {
    const matchesInstance = SequelizeMatchesModel.bulkBuild(MatchesMock.matchesFinished)
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(matchesInstance)

    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(MatchesMock.matchesFinished);
  });

  describe('PATCH /matches/:id - Integration Tests', () => {
    it('Token não informado - deve retornar erro', async () => {
      const response = await chai.request(app).patch('/matches/56').set({ authorization: ''});

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token not found' });
});
}); });
