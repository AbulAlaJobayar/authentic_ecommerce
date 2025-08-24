import supertest from 'supertest';
import app from '../src/app';
import { createTestUser, getAdminToken } from './utils';

const baseApi = 'api/v1/user';
const createUser = {
  name: 'test',
  email: `test${Math.floor(Math.random() * 10000)}@gmail.com`,
  password: `Test${Math.floor(Math.random() * 10000)}@#$`,
  role: 'SUPER_ADMIN',
  mobile: `+880192821${Math.floor(Math.random() * 10000)}`,
};
const updateUser = {
  name: `test${Math.floor(Math.random() * 10000)}`,
};

describe('User', () => {
  let id: string;
  let adminToken: string;
  beforeAll(async () => {
    adminToken = await getAdminToken();
  });

  describe('create a user into DB', () => {
    it('it should return created user', async () => {
      const res = await createTestUser(createUser);
      expect(res.body.data).toHaveProperty('statusCode', 201);
      id = res.body.data.id;
    });
  });
  describe('get users from DB', () => {
    it('it should return all users', async () => {
      await supertest(app)
        .get(baseApi)
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
  describe('update only superAdmin', () => {
    it('it should update only super Admin info', async () => {
      await supertest(app)
        .patch(`${baseApi}/${id}`)
        .set('Authorization', adminToken)
        .set('Accept', 'application/json')
        .send(updateUser)
        .expect(200);
    });
  });
  describe('delete User', () => {
    it('it should soft delete user from db', async () => {
      await supertest(app)
        .delete(`${baseApi}/${id}`)
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
});
