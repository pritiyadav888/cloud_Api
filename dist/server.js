"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_config_1 = __importDefault(require("./config/mongoose.config"));
var dotenv_config_1 = __importDefault(require("./config/dotenv.config"));
var express_conifg_1 = __importDefault(require("./config/express.conifg"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express = require("express");
// require('dotenv').config()
(0, dotenv_config_1.default)();
(0, mongoose_config_1.default)();
var port = parseInt(process.env.PORT || "8080");
var app = (0, express_conifg_1.default)();
app.use(express.json());
var user = {
    id: '1',
    age: 10,
    score: 20.0
};
app.get('/api', function (req, res) {
    res.json({
        message: 'Welcome to the API'
    });
});
// app.post('/api/posts', verifyToken, (req, res) => {  
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: 'Post created...',
//         authData
//       });
//     }
//   });
// });
app.post('/api/login', function (req, res) {
    jsonwebtoken_1.default.sign({ user: user }, 'secretkey', { expiresIn: '30s' }, function (err, token) {
        res.json({
            token: token
        });
    });
});
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    var bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        var bearer = bearerHeader.split(' ');
        // Get token from array
        var bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else {
        // Forbidden
        res.sendStatus(403);
    }
}
app.listen(port, function () {
    console.log("Backend Server started on port ".concat(port));
});
//# sourceMappingURL=server.js.map