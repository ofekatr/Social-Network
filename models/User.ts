const { model, Schema } = require('mongoose');

export {};

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdDate: String
});

module.exports = model('User', userSchema);