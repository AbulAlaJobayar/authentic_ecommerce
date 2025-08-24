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
exports.AuthServices = void 0;
const sendEmail_1 = require("./../../shared/sendEmail");
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../error/AppError");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const comparPassword_1 = __importDefault(require("../../helper/comparPassword"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const verificationEmail_1 = __importDefault(require("../../template/verificationEmail"));
const hashPassword_1 = __importDefault(require("../../helper/hashPassword"));
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    if (user.isDeleted === true) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account has been deleted');
    }
    if (user.accountStatus !== 'ACTIVE') {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, `Account is ${user.accountStatus.toLowerCase()}`);
    }
    if (!(yield (0, comparPassword_1.default)(payload.password, user.password))) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'your password is incorrect');
    }
    // generate token
    const data = {
        id: user.id,
        customId: user.customId,
        name: user.name,
        role: user.role,
    };
    const accessToken = jwtHelper_1.jwtHelper.generateToken(data, config_1.default.jwt.jwtAccessSecret, config_1.default.jwt.jwtAccessExpire);
    const refreshToken = jwtHelper_1.jwtHelper.generateToken(data, config_1.default.jwt.jwtRefreshSecret, config_1.default.jwt.jwtRefreshExpire);
    return {
        accessToken,
        refreshToken,
        verifyAt: user.verifiedAt,
    };
});
const verifyUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwtVerifySecret);
    const { id } = decoded;
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    if (user.isDeleted === true) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account has been deleted');
    }
    if (user.accountStatus !== 'ACTIVE') {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, `Account is ${user.accountStatus.toLowerCase()}`);
    }
    yield prisma_1.default.user.update({
        where: { id: user.id },
        data: { verifiedAt: true },
    });
    return null;
});
const sendEmailVerification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    if (user.isDeleted === true) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account has been deleted');
    }
    if (user.accountStatus !== 'ACTIVE') {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, `Account is ${user.accountStatus.toLowerCase()}`);
    }
    //localhost:3000/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4
    const tokenData = {
        id: user.id,
        email: user.email,
        customId: user.customId,
        role: user.role,
    };
    const verifyToken = jwtHelper_1.jwtHelper.generateToken(tokenData, config_1.default.jwt.jwtVerifySecret, config_1.default.jwt.jwtVerifyExpire);
    const url = `${config_1.default.domainName}/verify?token=${verifyToken}`;
    (0, sendEmail_1.sendEmail)({
        to: user.email,
        subject: 'Verify your email',
        html: (0, verificationEmail_1.default)(url, 'Verify My Email'),
    });
    return null;
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id: userData.id },
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    if (user.isDeleted === true) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account has been deleted');
    }
    if (!user.verifiedAt) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account not verified. Please verify your email');
    }
    if (user.accountStatus !== 'ACTIVE') {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, `Account is ${user.accountStatus.toLowerCase()}`);
    }
    if (!(yield (0, comparPassword_1.default)(payload.oldPassword, user.password))) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'your password is incorrect');
    }
    const newPassword = yield (0, hashPassword_1.default)(payload.newPassword);
    yield prisma_1.default.user.update({
        where: { id: user.id },
        data: { password: newPassword },
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwtRefreshSecret);
    const { id } = decoded;
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    if (user.isDeleted === true) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account has been deleted');
    }
    if (!user.verifiedAt) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account not verified. Please verify your email');
    }
    if (user.accountStatus !== 'ACTIVE') {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, `Account is ${user.accountStatus.toLowerCase()}`);
    }
    // generate token
    const data = {
        id: user.id,
        customId: user.customId,
        name: user.name,
        role: user.role,
    };
    const accessToken = jwtHelper_1.jwtHelper.generateToken(data, config_1.default.jwt.jwtAccessSecret, config_1.default.jwt.jwtAccessExpire);
    return accessToken;
});
const forgotPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    if (user.isDeleted === true) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account has been deleted');
    }
    if (user.accountStatus !== 'ACTIVE') {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, `Account is ${user.accountStatus.toLowerCase()}`);
    }
    if (!user.verifiedAt) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account not verified. Please verify your email');
    }
    //localhost:3000/reset?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4
    const tokenData = {
        id: user.id,
        email: user.email,
        customId: user.customId,
        role: user.role,
    };
    const verifyToken = jwtHelper_1.jwtHelper.generateToken(tokenData, config_1.default.jwt.jwtAccessSecret, '10m');
    const url = `${config_1.default.domainName}/reset?token=${verifyToken}`;
    (0, sendEmail_1.sendEmail)({
        to: user.email,
        subject: 'Reset your Password',
        html: (0, verificationEmail_1.default)(url, 'Reset your Password in 10 minutes'),
    });
    return null;
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwtAccessSecret);
    const { id } = decoded;
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    if (user.isDeleted === true) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account has been deleted');
    }
    if (!user.verifiedAt) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Account not verified. Please verify your email');
    }
    if (user.accountStatus !== 'ACTIVE') {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, `Account is ${user.accountStatus.toLowerCase()}`);
    }
    const newPassword = yield (0, hashPassword_1.default)(payload.newPassword);
    yield prisma_1.default.user.update({
        where: { id: user.id },
        data: { password: newPassword },
    });
    return null;
});
exports.AuthServices = {
    userLogin,
    verifyUser,
    sendEmailVerification,
    changePassword,
    refreshToken,
    forgotPassword,
    resetPassword,
};
