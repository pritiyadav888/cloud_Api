const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    scores: {
        type: [mongoose.Types.Decimal128],
        required: true
    },
    id: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
  });

const User =  mongoose.model("User", userSchema);

module.exports = User;