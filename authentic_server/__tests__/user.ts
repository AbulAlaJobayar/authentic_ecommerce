import supertest from 'supertest';
import app from '../src/app';

const createUser = {
  name: 'test',
  email: `test${Math.floor(Math.random() * 10000)}@gmail.com`,
  password: `Test${Math.floor(Math.random() * 10000)}@`,
  role: 'CUSTOMER',
  mobile: `+880192821${Math.floor(Math.random() * 10000)}`,
};

describe('User', () => {
  describe('create a user into DB', () => {
    it('it should return created user', async () => {
      await supertest(app)
        .post('/api/v1/user')
        .send(createUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
    });
  });
  describe('get users from DB', () => {
    it('it should return all users', async () => {
      await supertest(app).get('/api/v1/user').expect(200);
    });
  });
});
