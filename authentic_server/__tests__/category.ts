import supertest from 'supertest';
import app from '../src/app';
import { getAdminToken } from './utils';

const baseApi = 'api/v1/category';
const createCategory = {
  name: 'test category',
};

describe('Category', () => {
  let adminToken: string;
  let id: string;
  beforeAll(async () => {
    adminToken = await getAdminToken();
  });
  describe('create Category into DB', () => {
    it('it should create a category successfully', async () => {
      const res = await supertest(app)
        .post(`${baseApi}`)
        .set('Authorization', adminToken)
        .send(createCategory)
        .expect(201);
      id = res.body.data.id;
      expect(res.body.data).toHaveProperty('statusCode', 201);
    });
  });
  describe('get All Categories From DB', () => {
    it('it should return all categories', async () => {
      await supertest(app)
        .get(`${baseApi}`)
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
  describe('update Category From DB', () => {
    it('it Should update category Info', async () => {
      await supertest(app)
        .patch(`${baseApi}/${id}`)
        .set('Authorization', adminToken)
        .send({ name: `test category update` })
        .expect(200);
    });
  });
  describe('delete Category From DB', () => {
    it('it Should delete category Info', async () => {
      await supertest(app)
        .delete(`${baseApi}/${id}`)
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
});
