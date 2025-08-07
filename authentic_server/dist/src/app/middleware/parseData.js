"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseData = () => {
    return (req, res, next) => {
        req.body = JSON.parse(req.body.data);
        return next();
    };
};
exports.default = parseData;
