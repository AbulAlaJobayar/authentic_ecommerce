import supertest from 'supertest';
import app from '../src/app';
import { getAdminToken } from './utils';

const baseApi = 'api/v1/warehouse';

describe('Warehouse Module', () => {
  let adminToken: string;
  let id:string
  beforeAll(async () => {
    adminToken = await getAdminToken();
  });
  describe('create Warehouse', () => {
    it('it should create a new Warehouse', async () => {
     const res= await supertest(app)
        .post(`${baseApi}`)
        .send({
          name: 'Test Warehouse',
          address: '123 Test St, Test City, TC 12345',
        })
        .set('Authorization', adminToken)
        .expect(201);
        expect(res.body.data).toHaveProperty('statusCode', 201);
        id = res.body.data.id;
    });
  });
  describe('get All Warehouses', () => {
    it('it should return all Warehouses', async () => {
      await supertest(app)
        .get(`${baseApi}`)
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
  describe('update Warehouse', () => {
    it('it should update Warehouse info', async () => {
      await supertest(app)
        .patch(`${baseApi}/${id}`)
        .send({
          name: 'updated warehouse',
        })
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
  describe('delete Warehouse', () => {
    it('it should soft delete Warehouse from db', async () => {
      await supertest(app)
        .delete(`${baseApi}/${id}`)
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
});
