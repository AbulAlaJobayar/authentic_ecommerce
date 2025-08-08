import supertest from 'supertest';
import app from '../src/app';

const res = supertest(app);
const verifyToken = '';
const baseApi = 'api/v1/auth';
describe('auth', () => {
    describe('verify User', () => {
      it('it should verify User Successfully', async () => {
        await res
          .post(`${baseApi}/verify-email`)
          .set('Authorization', verifyToken)
          .expect(200);
      });
    });
  });

