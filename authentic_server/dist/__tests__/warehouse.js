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
const baseApi = 'api/v1/warehouse';
describe('Warehouse Module', () => {
    let adminToken;
    let id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        adminToken = yield (0, utils_1.getAdminToken)();
    }));
    describe('create Warehouse', () => {
        it('it should create a new Warehouse', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .post(`${baseApi}`)
                .send({
                name: 'Test Warehouse',
                address: '123 Test St, Test City, TC 12345',
            })
                .set('Authorization', adminToken)
                .expect(201);
            expect(res.body.data).toHaveProperty('statusCode', 201);
            id = res.body.data.id;
        }));
    });
    describe('get All Warehouses', () => {
        it('it should return all Warehouses', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .get(`${baseApi}`)
                .set('Authorization', adminToken)
                .expect(200);
        }));
    });
    describe('update Warehouse', () => {
        it('it should update Warehouse info', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .patch(`${baseApi}/${id}`)
                .send({
                name: 'updated warehouse',
            })
                .set('Authorization', adminToken)
                .expect(200);
        }));
    });
    describe('delete Warehouse', () => {
        it('it should soft delete Warehouse from db', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .delete(`${baseApi}/${id}`)
                .set('Authorization', adminToken)
                .expect(200);
        }));
    });
});
