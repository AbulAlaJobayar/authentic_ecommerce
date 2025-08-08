/* eslint-disable @typescript-eslint/no-explicit-any */
import supertest from 'supertest';
import app from '../src/app';

export const getAdminToken = async (): Promise<string> => {
  const res = await supertest(app)
    .post('api/v1/auth/login')
    .send({
      email: process.env.TEST_ADMIN_EMAIL || 'jobayar59@gmail.com',
      password: process.env.TEST_ADMIN_PASSWORD || 'Jobayar12346@',
    });
  return res.body.data;
};

export const createTestUser = async (userData?: any) => {
  const response = await supertest(app)
    .post('/api/v1/user')
    .field('data', JSON.stringify({ userData }))
    .expect(201);

  return response.body;
};
