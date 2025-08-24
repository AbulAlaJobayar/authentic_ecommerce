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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const config_1 = __importDefault(require("../../config"));
const hashPassword_1 = __importDefault(require("../../helper/hashPassword"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const sendEmail_1 = require("../../shared/sendEmail");
const verificationEmail_1 = __importDefault(require("../../template/verificationEmail"));
const user_utils_1 = require("./user.utils");
const imageUpload_1 = require("../../shared/imageUpload");
const user_constant_1 = require("./user.constant");
const paginationHelper_1 = require("../../helper/paginationHelper");
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
        role: user.role,
    };
    const verifyToken = jwtHelper_1.jwtHelper.generateToken(tokenData, config_1.default.jwt.jwtVerifySecret, config_1.default.jwt.jwtVerifyExpire);
    const url = `${config_1.default.domainName}/verify?token=${verifyToken}`;
    (0, sendEmail_1.sendEmail)({
        to: user.email,
        subject: 'Verify your email',
        html: (0, verificationEmail_1.default)(url, 'Verify My Email'),
    });
    return user;
});
const getAllUserFromDB = (filters, option) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(option);
    if (typeof filterData.isDeleted === 'string') {
        if (filterData.isDeleted === 'true') {
            filterData.isDeleted = true;
        }
        else if (filterData.isDeleted === 'false') {
            filterData.isDeleted = false;
        }
    }
    if (typeof filterData.verifiedAt === 'string') {
        if (filterData.verifiedAt === 'true') {
            filterData.verifiedAt = true;
        }
        else if (filterData.verifiedAt === 'false') {
            filterData.verifiedAt = false;
        }
    }
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: 'desc',
            },
        select: {
            id: true,
            customId: true,
            name: true,
            email: true,
            mobile: true,
            image: true,
            role: true,
            isDeleted: true,
            accountStatus: true,
            verifiedAt: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const total = yield prisma_1.default.user.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getMeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            customId: true,
            name: true,
            email: true,
            mobile: true,
            image: true,
            role: true,
            verifiedAt: true,
            accountStatus: true,
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
    yield prisma_1.default.user.update({
        where: { id: id },
        data: { isDeleted: true },
    });
    return null;
});
exports.UserService = {
    createUserIntoDB,
    getAllUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
    getMeFromDB,
};
