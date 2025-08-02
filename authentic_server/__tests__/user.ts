import supertest from "supertest"
import app from "../src/app";

const createUser={
    name:"test",
    email:`test${Math.floor(Math.random()*10000)}@gmail.com`,
    password:`Test${Math.floor(Math.random()*10000)}@`,
    role:"CUSTOMER",
    mobile:`+880192821${Math.floor(Math.random()*10000)}`
}

describe('User', () => {
  describe('create a user into DB', () => {
    it('it should return success message true',async()=>{
       await supertest(app).post('/api/v1/user/createUser').send(createUser).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201)
    });
  });
});
