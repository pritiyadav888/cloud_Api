"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
exports.default = (function () {
    var result = (0, dotenv_1.config)();
    if (result && result.error) {
        console.log("Error trying to load the config file: ".concat(result.error));
        return;
    }
    console.log("Config file loaded successfully.");
});
//# sourceMappingURL=dotenv.config.js.map