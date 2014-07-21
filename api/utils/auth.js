var User = require('../db/models/user'),
    jwt = require('jsonwebtoken'),
    secret = 'greselightning';

var authenticate = function(req, res){

    var username = req.body.username,
        password = req.body.password;

    User.User.findOne({username: username}, function(err, user){
        if(err) { return res.send({message: 'Error while finding user by username'}); }
        if(!user) { return res.send({message: 'Incorrect username.'}); }
        if(!User.validatePassword(user, password)){ return res.send({message: 'Incorrect password'}); }
        var profile = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        var response = {user: profile, token: generateAuthToken(user), result: 'SUCCESS' };
        res.send(response);
    });
};

var generateAuthToken = function(user){
    var profile = {
        id: user._id,
        username: user.username,
        email: user.email
    };
    var token = jwt.sign(profile, secret, {expiresInMinutes: 60 * 24}); // one day
    return token;
};

var checkAuthToken = function(req, res, next){
    console.log('verifying token...');
    var headers = req.headers;
    var authToken = headers.apitoken;
    if(!authToken || authToken.length <= 0){ return res.status(401); }
    jwt.verify(authToken, secret, function(err, decoded){
        if(err){ return res.send(401); }
        console.log('token verified.');
        next();
    });
};

exports.authenticate = authenticate;
exports.checkAuthToken = checkAuthToken;
exports.secret = secret;