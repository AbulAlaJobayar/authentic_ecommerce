import supertest from 'supertest';
import app from '../src/app';

export const superAdminToken = '';

const baseApi = 'api/v1/user';
const createUser = {
  name: 'test',
  email: `test${Math.floor(Math.random() * 10000)}@gmail.com`,
  password: `Test${Math.floor(Math.random() * 10000)}@`,
  role: 'CUSTOMER',
  mobile: `+880192821${Math.floor(Math.random() * 10000)}`,
};
const updateUser = {
  name: `test${Math.floor(Math.random() * 10000)}`,
};

const id = 1234567;

describe('User', () => {
  describe('create a user into DB', () => {
    it('it should return created user', async () => {
      await supertest(app)
        .post(baseApi)
        .send(createUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
    });
  });
  describe('get users from DB', () => {
    it('it should return all users', async () => {
      await supertest(app)
        .get(baseApi)
        .set('Authorization', superAdminToken)
        .expect(200);
    });
  });
  describe('update only superAdmin', () => {
    it('it should update only super Admin info', async () => {
      await supertest(app)
        .patch(`${baseApi}/{id}`)
        .set('Authorization', superAdminToken)
        .set('Accept', 'application/json')
        .send(updateUser)
        .expect(200);
    });
  });
  describe('delete User', () => {
    it('it should soft delete user from db', async () => {
      await supertest(app)
        .delete(`${baseApi}/{id}`)
        .set('Authorization', superAdminToken)
        .expect(200);
    });
  });
});
