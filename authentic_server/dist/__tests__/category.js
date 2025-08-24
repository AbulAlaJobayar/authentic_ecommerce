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
const baseApi = 'api/v1/category';
const createCategory = {
    name: 'test category',
};
describe('Category', () => {
    let adminToken;
    let id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        adminToken = yield (0, utils_1.getAdminToken)();
    }));
    describe('create Category into DB', () => {
        it('it should create a category successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .post(`${baseApi}`)
                .set('Authorization', adminToken)
                .send(createCategory)
                .expect(201);
            id = res.body.data.id;
            expect(res.body.data).toHaveProperty('statusCode', 201);
        }));
    });
    describe('get All Categories From DB', () => {
        it('it should return all categories', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .get(`${baseApi}`)
                .set('Authorization', adminToken)
                .expect(200);
        }));
    });
    describe('update Category From DB', () => {
        it('it Should update category Info', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .patch(`${baseApi}/${id}`)
                .set('Authorization', adminToken)
                .send({ name: `test category update` })
                .expect(200);
        }));
    });
    describe('delete Category From DB', () => {
        it('it Should delete category Info', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .delete(`${baseApi}/${id}`)
                .set('Authorization', adminToken)
                .expect(200);
        }));
    });
});
