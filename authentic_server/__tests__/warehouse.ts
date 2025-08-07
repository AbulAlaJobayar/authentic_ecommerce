import supertest from 'supertest';
import app from '../src/app';
import { superAdminToken } from './user';

const baseApi = 'api/v1/warehouse';
const id = 123456;

describe('Warehouse Module', () => {
  describe('create Warehouse', () => {
    it('it should create a new Warehouse', async () => {
      await supertest(app)
        .post(`${baseApi}`)
        .send({
          name: 'Test Warehouse',
          address: '123 Test St, Test City, TC 12345',
        })
        .set('Authorization', superAdminToken)
        .expect(201);
    });
  });
  describe('get All Warehouses', () => {
    it('it should return all Warehouses', async () => {
      await supertest(app)
        .get(`${baseApi}`)
        .set('Authorization', superAdminToken)
        .expect(200);
    });
  });
  describe('update Warehouse', () => {
    it('it should update Warehouse info', async () => {
      await supertest(app).patch(`${baseApi}/${id}`).send({
        name: 'updated warehouse',
      }).set('Authorization', superAdminToken)
        .expect(200);
    });
  });
  describe('delete Warehouse', () => {
    it('it should soft delete Warehouse from db', async () => {
      await supertest(app)
        .delete(`${baseApi}/${id}`)
        .set('Authorization', superAdminToken)
        .expect(200);
    });
  });
});
