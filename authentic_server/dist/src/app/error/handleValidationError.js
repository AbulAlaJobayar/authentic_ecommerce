"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    // handle the error here
    const errorSources = [
        {
            path: '',
            message: err.message,
        },
    ];
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleValidationError;
