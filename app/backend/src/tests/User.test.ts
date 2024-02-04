import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUsersModel from '../database/models/SequelizeUsersModel';

import { Response } from 'superagent';
import UserMock from './mocks/User.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users fluxo testes', () => {
  beforeEach(() => sinon.restore());

  it('Teste se user com email inválido', async () => {
    const response = await chai.request(app).post('/login').send(UserMock.NotValidUserEmail);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });
  it('Teste se com senha inválida', async () => {
    const response = await chai.request(app).post('/login').send(UserMock.NotValidUserPassword);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });
  it('Teste se user válido com usuário inválida', async () => {
    const response = await chai.request(app).post('/login').send(UserMock.validUser);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
  });
});
