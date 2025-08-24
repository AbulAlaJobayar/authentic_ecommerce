"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const utils_1 = require("./utils");
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
    let id;
    let adminToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        adminToken = yield (0, utils_1.getAdminToken)();
    }));
    describe('create a user into DB', () => {
        it('it should return created user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, utils_1.createTestUser)(createUser);
            expect(res.body.data).toHaveProperty('statusCode', 201);
            id = res.body.data.id;
        }));
    });
    describe('get users from DB', () => {
        it('it should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .get(baseApi)
                .set('Authorization', adminToken)
                .expect(200);
        }));
    });
    describe('update only superAdmin', () => {
        it('it should update only super Admin info', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .patch(`${baseApi}/${id}`)
                .set('Authorization', adminToken)
                .set('Accept', 'application/json')
                .send(updateUser)
                .expect(200);
        }));
    });
    describe('delete User', () => {
        it('it should soft delete user from db', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .delete(`${baseApi}/${id}`)
                .set('Authorization', adminToken)
                .expect(200);
        }));
    });
});
