import supertest from 'supertest';
import app from '../src/app';
import { superAdminToken } from './user';

const baseApi = 'api/v1/category';
const createCategory = {
  name: 'test category',
};
const id = 123456;

describe('Category', () => {
  describe('create Category into DB', () => {
    it('it should create a category successfully', async () => {
      await supertest(app)
        .post(`${baseApi}`)
        .set('Authorization', superAdminToken)
        .send(createCategory)
        .expect(200);
    });
  });
  describe('get All Categories From DB', () => {
    it('it should return all categories', async () => {
      await supertest(app)
        .get(`${baseApi}`)
        .set('Authorization', superAdminToken)
        .expect(200);
    });
  });
  describe('update Category From DB', () => {
    it('it Should update category Info', async () => {
      await supertest(app)
        .patch(`${baseApi}/${id}`)
        .set('Authorization', superAdminToken)
        .send({ name: `test category update` })
        .expect(200);
    });
  });
  describe('delete Category From DB', () => {
    it('it Should delete category Info', async () => {
      await supertest(app)
        .delete(`${baseApi}/${id}`)
        .set('Authorization', superAdminToken)
        .expect(200);
    });
  });
});
