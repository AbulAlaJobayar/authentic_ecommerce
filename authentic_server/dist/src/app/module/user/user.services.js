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
exports.UserService = void 0;
const config_1 = __importDefault(require("../../config"));
const hashPassword_1 = __importDefault(require("../../helper/hashPassword"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const sendEmail_1 = require("../../shared/sendEmail");
const verificationEmail_1 = __importDefault(require("../../template/verificationEmail"));
const user_utils_1 = require("./user.utils");
const imageUpload_1 = require("../../shared/imageUpload");
const createUserIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (req.file) {
        const image = yield imageUpload_1.imageUploader.uploadImageToS3(file);
        req.body.image = image;
    }
    const password = (yield (0, hashPassword_1.default)(req.body.password));
    req.body.password = password;
    const customId = (yield (0, user_utils_1.generateCustomId)(req.body.role));
    req.body.customId = customId;
    const user = yield prisma_1.default.user.create({
        data: req.body,
        select: {
            id: true,
            name: true,
            customId: true,
            email: true,
            mobile: true,
            image: true,
            role: true,
            verifiedAt: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    //localhost:3000/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4
    const tokenData = {
        id: user.id,
        email: user.email,
        customId: user.customId,
    };
    const verifyToken = jwtHelper_1.jwtHelper.generateToken(tokenData, config_1.default.jwt.jwtVerifySecret, config_1.default.jwt.jwtVerifyExpire);
    const url = `${config_1.default.domainName}/verify?token=${verifyToken}`;
    (0, sendEmail_1.sendEmail)({
        to: user.email,
        subject: 'Verify your email',
        html: (0, verificationEmail_1.default)(url),
    });
    return user;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // TODO ADD Pagination search sort field
    const result = yield prisma_1.default.user.findMany({
        where: { isDeleted: false },
        select: {
            id: true,
            customId: true,
            name: true,
            email: true,
            mobile: true,
            image: true,
            role: true,
            verifiedAt: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const updateUserFromDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const file = req.file;
    if (req.file) {
        const image = yield imageUpload_1.imageUploader.uploadImageToS3(file);
        req.body.image = image;
    }
    const result = yield prisma_1.default.user.update({
        where: { id: id },
        data: req.body,
    });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: { id: id },
        data: { isDeleted: true },
    });
});
exports.UserService = {
    createUserIntoDB,
    getAllUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
};
