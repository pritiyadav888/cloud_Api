"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function () {
    if (process.env.DB) {
        mongoose_1.default.connect(process.env.DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(function () { return console.log('DB Connected...'); })
            .catch(function (err) {
            console.log("DB Connection Error: ".concat(err.message));
        });
    }
    else {
        console.log('DB Connection string not configured.');
    }
});
//# sourceMappingURL=mongoose.config.js.map