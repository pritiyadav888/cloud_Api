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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AuthData = require("./model/auth");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
module.exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, UserAuth.findOne({ username: username }).lean()];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.json({ status: "error", error: "Invalid username/password" })];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                if (_b.sent()) {
                    token = jwt.sign({
                        id: user._id,
                        username: user.username,
                    }, process.env.JWT_SECRET);
                    return [2 /*return*/, res.json({ status: "ok", data: token })];
                }
                else {
                    return [2 /*return*/, res
                            .status(400)
                            .send({ success: false, message: "Authentication failed" })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).send({
                        success: false,
                        message: "Error authenticating user \\\n Error:".concat(error_1.message),
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
module.exports.register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, plainTextPassword, password, response, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, plainTextPassword = _a.password;
                return [4 /*yield*/, bcrypt.hash(plainTextPassword, 10)];
            case 1:
                password = _b.sent();
                if (!username || typeof username !== "string") {
                    return [2 /*return*/, res.json({ status: "error", error: "Invalid username" })];
                }
                if (!plainTextPassword || typeof plainTextPassword !== "string") {
                    return [2 /*return*/, res.json({ status: "error", error: "Invalid password" })];
                }
                if (plainTextPassword.length < 5) {
                    return [2 /*return*/, res.json({
                            status: "error",
                            error: "Password too small. Should be atleast 6 characters",
                        })];
                }
                return [4 /*yield*/, UserAuth.create({
                        username: username,
                        password: password,
                    })];
            case 2:
                response = _b.sent();
                console.log("User created successfully: ", response);
                return [2 /*return*/, res.send(200)];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).send({
                        success: false,
                        message: "Error authenticating user \\\n Error:".concat(error_2.message),
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=authenticate.controller.js.map