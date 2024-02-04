import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';

import { Response } from 'superagent';
import LeaderboardMock from './mocks/Leaderboard.Mock';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard fluxo testes', () => {
  beforeEach(() => sinon.restore());

  it('Teste se retorna todos os matches', async () => {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(LeaderboardMock.allMatches as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(LeaderboardMock.allMatches);
  });
});