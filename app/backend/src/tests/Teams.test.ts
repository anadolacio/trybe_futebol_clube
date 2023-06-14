import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';

import { Response } from 'superagent';
import TeamMock from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams fluxo testes', () => {
  beforeEach(() => sinon.restore());

  it('Teste se retorna todos os teams', async () => {
    sinon.stub(SequelizeTeamsModel, 'findAll').resolves(TeamMock.allTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(TeamMock.allTeams);
  });

  it('Teste se retorna teams por ID', async () => {
    sinon.stub(SequelizeTeamsModel, 'findByPk').resolves(TeamMock.team as any);

    const { status, body } = await chai.request(app).get('/teams/5');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(TeamMock.team);
  });

  it('Teste se retorna teams por ID retorna nulo se ID for inválido', async () => {
    sinon.stub(SequelizeTeamsModel, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/999');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(null);
  });
});
