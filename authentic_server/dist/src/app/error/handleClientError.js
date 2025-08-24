"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (err) => {
    var _a;
    let errors = [];
    let message = '';
    const statusCode = 400;
    if (err.code === 'P2025') {
        message = ((_a = err.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Record not found!';
        errors = [
            {
                path: '',
                message,
            },
        ];
    }
    else if (err.code === 'P2003') {
        if (err.message.includes('delete()` invocation:')) {
            message = 'Delete failed';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
    }
    return {
        statusCode,
        message,
        errorSources: errors,
    };
};
exports.default = handleClientError;
