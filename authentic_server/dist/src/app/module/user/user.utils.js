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
exports.generateCustomId = void 0;
const prisma_1 = require("../../../../generated/prisma");
const prisma_2 = __importDefault(require("../../shared/prisma"));
// Define prefix mapping for each role
const ROLE_PREFIXES = {
    [prisma_1.Role.CUSTOMER]: 'AC',
    [prisma_1.Role.SUPER_ADMIN]: 'SU',
    [prisma_1.Role.STAFF]: 'ST',
    [prisma_1.Role.MANAGER]: 'MA',
    // Add other roles if needed
};
const generateCustomId = (role) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the last user with the specified role
    const lastUser = yield prisma_2.default.user.findFirst({
        where: { role },
        orderBy: { createdAt: 'desc' },
        select: { customId: true },
    });
    // Determine the next ID number
    let nextNumber = 1; // Default to 1 if no users exist
    if (lastUser === null || lastUser === void 0 ? void 0 : lastUser.customId) {
        // Extract the numeric part (assuming format "XX-0000")
        const numberPart = lastUser.customId.split('-')[1];
        if (numberPart) {
            const lastNumber = parseInt(numberPart, 10);
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }
    }
    // Format the new ID with leading zeros
    const prefix = ROLE_PREFIXES[role];
    return `${prefix}-${nextNumber.toString().padStart(4, '0')}`;
});
exports.generateCustomId = generateCustomId;
