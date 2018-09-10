const mongoose = require('mongoose');

const userSchema = require(`./user`);

const user = mongoose.model('User', userSchema);

module.exports = { User: user };
