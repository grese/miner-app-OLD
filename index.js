


    var express = require('express'),
        connect = require('connect'),
        fs = require('fs'),
        path = require('path'),
        request = require('request'),
        http = require('http'),
        auth = require('./tasks/auth'),
        passport = auth.passport,
        lockFile = require('lockfile'),
        secret = auth.secret,
        config = require('./package.json'),
        proxyURL = config.proxyURL,
        proxyPath = config.proxyPath;

    require('express-namespace');
    var app = express();

    app.use(express.compress());

    // Setup authentication with passportjs
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({
        secret: secret,
        cookie: { maxAge : 3600000 * 24 } //1 Hour
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    // Use API proxy
    app.all('/*', verifyUserAuth);
    require('./api/routes')(app, proxyPath);
    app.put(proxyPath+'/users/*', passThrough(proxyURL));
    app.all('/auth/logout', auth.logoutUser);
    // Login session for express server.  express.bodyParser() is needed because the login form wasn't working without it.
    // The bodyParser needed to be added to only this route because it was breaking post/put/delete requests from all
    // other routes.
    app.post('/auth/login', passport.authenticate('local'), auth.sendLoginResponse);

    app.use(lock);
    app.use(static({ directory: 'dist' }));
    app.use(static({ file: 'dist/index.html', ignoredFileExtensions: /\.\w{1,5}$/ })); // Gotta catch 'em all

    var port = 8000;
    app.listen(port);
    console.log('Server started on port: ', port);

// Middleware
// ==========

function lock(req, res, next) { // Works with tasks/locking.js
    (function retry() {
        if (lockFile.checkSync('tmp/connect.lock')) {
            setTimeout(retry, 30);
        } else { next(); }
    })();
}

function static(options) {
    return function(req, res, next) { // Gotta catch 'em all (and serve index.html)
        var filePath = "";
        if (options.directory) {
            var regex = new RegExp('^' + (options.urlRoot || ''));
            // URL must begin with urlRoot's value
            if (!req.path.match(regex)) { next(); return; }
            filePath = options.directory + req.path.replace(regex, '');
        } else if (options.file) {
            filePath = options.file;
        } else { throw new Error('static() isn\'t properly configured!'); }

        fs.stat(filePath, function(err, stats) {
            if (err) { next(); return; } // Not a file, not a folder => can't handle it

            if (options.ignoredFileExtensions) {
                if (options.ignoredFileExtensions.test(req.path)) {
                    res.send(404, {error: 'Resource not found'});
                    return; // Do not serve index.html
                }
            }

            // Is it a directory? If so, search for an index.html in it.
            if (stats.isDirectory()) { filePath = path.join(filePath, 'index.html'); }

            // Serve the file
            res.sendfile(filePath, function(err) {
                if (err) { next(); return; }
            });
        });
    };
}

function verifyUserAuth(req, res, next){
    var url = req.url;
    if((url.indexOf('/api') > -1) ||
        (url.indexOf('/auth') > -1) ||
        (url.indexOf('/login') > -1) ||
        (url.indexOf('/config') > -1) ||
        (url.indexOf('/tests') > -1) ||
        (url.indexOf('/vendor') > -1) ||
        (url.indexOf('/assets') > -1)){
        return next();
    }else{
        if(!req.isAuthenticated()){
            return res.redirect('/login');
        }else{
            return next();
        }
    }
}

function passThrough(target) {
    return function(req, res) {
        req.pipe(request(target+req.url)).pipe(res);
    };
}