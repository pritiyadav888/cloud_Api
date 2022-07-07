"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var App = function () {
    // const UsersRoute = require('./routes/users.route')
    // const LoginRoute = require('./routes/login.route')
    var app = (0, express_1.default)();
    if (process.env.NODE_ENV === 'development') {
        app.use((0, morgan_1.default)('dev'));
    }
    else if (process.env.NODE_ENV === 'production') {
        app.use((0, compression_1.default)());
    }
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json({ limit: '3mb' }));
    app.use((0, cors_1.default)());
    app.get('/', function (req, res) {
        res.send('Backend Server is running...');
    });
    // app.use('/api/users', UsersRoute);
    // app.use('/api/login', LoginRoute);
    return app;
};
exports.default = App;
//# sourceMappingURL=express.conifg.js.map