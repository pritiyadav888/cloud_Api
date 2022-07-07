"use strict";
var mongoose = require('mongoose');
var UserAuth = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'userAuth' });
var model = mongoose.model('UserAuth', UserAuth);
module.exports = model;
//# sourceMappingURL=auth.model.js.map