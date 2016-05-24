module.exports = function(mongoose) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var passportLocalMongoose = require('passport-local-mongoose');
    var userSchema = new Schema({

    username: String,
    password: String,
    email: String,
    gender: String,
    address: String
    });

    userSchema.plugin(passportLocalMongoose);

    var User = mongoose.model('User', userSchema);
    return User;
}
