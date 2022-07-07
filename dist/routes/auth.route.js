"use strict";
var express = require("express");
var router = express.Router();
var AuthenticationController = require('../controllers/auth.controller');
router.post('/', AuthenticationController.register);
module.exports = router;
//# sourceMappingURL=auth.route.js.map