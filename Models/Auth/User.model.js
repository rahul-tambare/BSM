const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    created: {
        type: Date,
        default: Date.now()
    }
});
const user = mongoose.model('user', UserSchema);
module.exports = user;