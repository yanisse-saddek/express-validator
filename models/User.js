const mongoose = require('mongoose')

const user = new mongoose.Schema({
    Username: String,
    Email:String,
    Age:Number,
    City:String
})

const UserModel = mongoose.model('User', user);

module.exports = UserModel