"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var AuthenticationController = require('../controllers/authentication.controller');
router.post('/', AuthenticationController.createToken);
router.post('/register', AuthenticationController.createToken);
module.exports = router;
//# sourceMappingURL=userAuth.route.js.map