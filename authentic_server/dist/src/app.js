"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = require("./app/middleware/notFound");
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://portfolio-rose-theta-63.vercel.app',
        '*',
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ['*'],
    credentials: true,
}));
app.use((0, helmet_1.default)());
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
// test route
app.get('/test', (req, res) => {
    res.send('Hello World!');
});
//main route
app.use('/api/v1', routes_1.default);
// global Error Route
app.use(globalErrorHandler_1.default);
//NotFound Route
app.use(notFound_1.NotFound);
exports.default = app;
