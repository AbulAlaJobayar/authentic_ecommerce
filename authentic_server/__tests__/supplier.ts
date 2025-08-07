import supertest from 'supertest';
import app from '../src/app';
import { superAdminToken } from './user';

const baseApi = 'api/v1/supplier';
const createSupplier = {
  name: 'test',
  email: `test@gmail.com`,
  mobile: `+8801928210545`,
  address: 'dhaka bangladesh',
};
const id = 123456;

describe('Supplier', () => {
  describe('create supplier', () => {
    it('it should return a new Supplier', async () => {
      await supertest(app)
        .post(baseApi)
        .send(createSupplier)
        .set('Authorization', superAdminToken)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
    });
  });
  describe('get All Suppliers', () => {
    it('it should return All supplier', async () => {
      await supertest(app)
        .get(`${baseApi}/${id}`)
        .set('Authorization', superAdminToken)
        .expect(200);
    });
  });
  describe('update Supplier', () => {
    it('it should update Supplier info', async () => {
      await supertest(app)
        .patch(`${baseApi}/${id}`)
        .set('Authorization', superAdminToken)
        .send({
          name: `test${Math.floor(Math.random() * 10000)}`,
        })
        .expect(200);
    });
  });
  describe('delete Supplier',()=>{
    it('it should soft delete supplier from db', async () => {
      await supertest(app)
        .delete(`${baseApi}/${id}`)
        .set('Authorization', superAdminToken)
        .expect(200);
    });
  })
});
