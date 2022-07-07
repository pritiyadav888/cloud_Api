"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('bodyParser');
var compress = require('compress');
var cors = require('cors');
var App = function () {
    var UsersRoute = require('../routes/users.route');
    var LoginRoute = require('../routes/login.route');
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '3mb' }));
    app.use(cors());
    app.get('/', function (req, res) {
        res.send('Backend Server is running...');
    });
    app.use('/api/users', UsersRoute);
    app.use('/api/login', LoginRoute);
    return app;
};
exports.default = App;
//# sourceMappingURL=express.conifg.js.map