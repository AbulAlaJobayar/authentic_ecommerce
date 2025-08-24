"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFiltarableableFields = exports.userSearchableFields = exports.UserStatus = exports.USER_ROLE = void 0;
exports.USER_ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    MANAGER: 'MANAGER',
    CUSTOMER: 'CUSTOMER',
    STAFF: 'STAFF',
};
exports.UserStatus = ['IN_PROGRESS', 'ACTIVE', 'BLOCK', 'SUSPEND'];
exports.userSearchableFields = [
    'customId',
    'email',
    'name',
    'mobile',
];
exports.userFiltarableableFields = [
    'searchTerm',
    'customId',
    'email',
    'name',
    'mobile',
    'accountStatus',
    "role",
    "verifiedAt",
    "isDeleted"
];
