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
const user_1 = require("./user");
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
        it('it should return a new Supplier', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .post(baseApi)
                .send(createSupplier)
                .set('Authorization', user_1.superAdminToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201);
        }));
    });
    describe('get All Suppliers', () => {
        it('it should return All supplier', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .get(`${baseApi}/${id}`)
                .set('Authorization', user_1.superAdminToken)
                .expect(200);
        }));
    });
});
