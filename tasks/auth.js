var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('connect-flash'),
    UserModel = require('../api/db/models/user'),
    jwt = require('jsonwebtoken'),
    secret = 'greselightning';


passport.use(new LocalStrategy(
    function(username, password, done){

        UserModel.User.findOne({username: username}, function(err, user){
            if(err) { return done(null, false, {message: 'Error while finding user by username'}); }
            if(!user) { return done(null, false, {message: 'Incorrect username.'}); }
            if(!UserModel.validatePassword(user, password)){ return done(null, false, {message: 'Incorrect password'}); }
            var profile = {
                id: user._id,
                username: user.username,
                email: user.email
            };
            var response = {user: profile, token: generateAuthToken(user)};
            done(null, response);
        });
    }
));


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

var logoutUser = function(req, res){
    req.logout();
    res.send(200);
};

var sendLoginResponse = function(req, res, next){
    //var user = JSON.parse(req.user);

    var result = req.user;
    if(result && result.token){
        result.result = 'SUCCESS';
        req.login(result, function(){
            res.send(result);
        });
    }else{
        res.send({message: 'Login Failed... user not found and/or API token not present.'});
    }
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

exports.checkAuthToken = checkAuthToken;
exports.passport = passport;
exports.secret = secret;
exports.sendLoginResponse = sendLoginResponse;
exports.logoutUser = logoutUser;