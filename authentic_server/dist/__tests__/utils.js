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
exports.createTestUser = exports.getAdminToken = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const getAdminToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default)
        .post('api/v1/auth/login')
        .send({
        email: process.env.TEST_ADMIN_EMAIL || 'jobayar59@gmail.com',
        password: process.env.TEST_ADMIN_PASSWORD || 'Jobayar12346@',
    });
    return res.body.data;
});
exports.getAdminToken = getAdminToken;
const createTestUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post('/api/v1/user')
        .field('data', JSON.stringify({ userData }))
        .expect(201);
    return response.body;
});
exports.createTestUser = createTestUser;
