var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    secret = 'greselightning',
    httpPost = require('http-post'),
    flash = require('connect-flash');


passport.use(new LocalStrategy(
    function(username, password, done){
        httpPost('http://localhost:3000/auth/login', { username: username, password: password }, function(res){
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                var data = JSON.parse(chunk);
                if(data && data.token){
                    return done(null, chunk);
                }else{
                    return done(null, false, {message: 'No token present from api.'});
                }
            });
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
    var user = JSON.parse(req.user);

    if(user && user.token){
        console.log('USER AND TOKEN FOUND');
        req.login(user, function(){
            res.send(user);
        });
    }else{
        res.send({message: 'Token not present from auth api'});
    }
};

exports.passport = passport;
exports.secret = secret;
exports.sendLoginResponse = sendLoginResponse;
exports.logoutUser = logoutUser;