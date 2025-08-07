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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../error/AppError");
const jwtHelper_1 = require("../helper/jwtHelper");
const config_1 = __importDefault(require("../config"));
const prisma_1 = __importDefault(require("../shared/prisma"));
const catchAsync_1 = __importDefault(require("../shared/catchAsync"));
const auth = (...role) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'user Unauthorized');
        }
        const verifyUser = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwtAccessSecret);
        const user = yield prisma_1.default.user.findUnique({
            where: { id: verifyUser === null || verifyUser === void 0 ? void 0 : verifyUser.id, isDeleted: false },
        });
        if (!user) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'user Not found');
        }
        if (user.accountStatus === 'BLOCK') {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'user is Blocked');
        }
        if (user.accountStatus === 'SUSPEND') {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'user is Suspend');
        }
        if (user.accountStatus === 'IN_PROGRESS') {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'user is In progress');
        }
        if (role && !role.includes(user.role)) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        req.user = verifyUser;
        next();
    }));
};
exports.default = auth;
