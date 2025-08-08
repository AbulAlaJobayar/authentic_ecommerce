import supertest from 'supertest';
import app from '../src/app';
import { getAdminToken } from './utils';

const baseApi = 'api/v1/supplier';
const createSupplier = {
  name: 'test',
  email: `test@gmail.com`,
  mobile: `+8801928210545`,
  address: 'dhaka bangladesh',
};

describe('Supplier', () => {
  let adminToken: string;
  let id:string
  beforeAll(async () => {
    adminToken = await getAdminToken();
  });
  describe('create supplier', () => {
    it('it should return a new Supplier', async () => {
    const res=  await supertest(app)
        .post(baseApi)
        .send(createSupplier)
        .set('Authorization', adminToken)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

        expect(res.body.data).toHaveProperty('statusCode', 201);
         id= res.body.data.id;
    });
  });
  describe('get All Suppliers', () => {
    it('it should return All supplier', async () => {
      await supertest(app)
        .get(`${baseApi}/${id}`)
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
  describe('update Supplier', () => {
    it('it should update Supplier info', async () => {
      await supertest(app)
        .patch(`${baseApi}/${id}`)
        .set('Authorization', adminToken)
        .send({
          name: `test${Math.floor(Math.random() * 10000)}`,
        })
        .expect(200);
    });
  });
  describe('delete Supplier', () => {
    it('it should soft delete supplier from db', async () => {
      await supertest(app)
        .delete(`${baseApi}/${id}`)
        .set('Authorization', adminToken)
        .expect(200);
    });
  });
});
