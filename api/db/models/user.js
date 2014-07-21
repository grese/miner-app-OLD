var mongoose = require('mongoose'),
    passwordHash = require('password-hash'),
    db = require('../db');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
UserSchema.set('toJSON', {
    virtuals: true
});
UserSchema.pre('save', function(next) {
    var user = this;
    if(!user.password || !user.isModified('password')) return next();
    var pass = user.password;
    user.password = passwordHash.generate(pass);
    next();
});
var User = mongoose.model('users', UserSchema);

exports.hashPassword = function(password){
    return passwordHash.generate(password);
};

exports.validatePassword = function(user, candidatePassword){
    return passwordHash.verify(candidatePassword, user.password);
};

exports.findByUsername = function(username){
    return User.findOne({username: username}, function(err, user){
        if(err) return err;
        return user;
    });
};

exports.find = function(req, res){
    var query = req.query ? req.query : {};
    return User.find(query, function(err, users){
        if(!err){
            users.forEach(function(u){
                u.password = null;
            });
            return db.sendAjaxResponse(res, users);
        }else{
            return console.log(err);
        }
    });
};

exports.findById = function(req, res){
    return User.findById(req.params.id, function(err, user){
        if(!err){
            // Set the password to null before sending user object to client.
            if(user){ user.password = null; }
            return db.sendAjaxResponse(res, user);
        }else{
            return console.log(err);
        }
    });
};

exports.updateUser = function(req, res){
    var u = {};
    if(req && req.body && req.body.user){
        if(req.body.user.username){ u.username = req.body.user.username; }
        if(req.body.user.password){ u.password = req.body.user.password; }
    }
    return User.findById(req.params.id, function(err, user){
        user.username = u.username ? u.username : user.username;
        user.password = u.password ? u.password : user.password;
        return user.save(function(err){
            if(!err){
                console.log('Updated user!');
                return db.sendAjaxResponse(res, user);
            }else{
                return console.log(err);
            }
        });
    });
};

exports.createUser = function(req, res){
    var u = req.body.user;
    var user = new User({
        username: u.username,
        password: u.password
    });
    user.save(function(err){
        if(!err){
            console.log('User created!');
            return db.sendAjaxResponse(res, user);
        }else{
            return console.log(err);
        }
    });
};

exports.deleteUser = function(req, res){
    return User.findById(req.params.id, function (err, user) {
        return user.remove(function (err) {
            if (!err) {
                console.log("Deleted user");
                return db.sendAjaxResponse(res, user);
            } else {
                return console.log(err);
            }
        });
    });
};

exports.User = User;